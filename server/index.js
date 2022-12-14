const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Redis = require('redis');
const dotenv = require('dotenv');

// import axios
const axios = require('axios');

// Mongoose Models
const Article = require('./models/articles');
const User = require('./models/users');
const Subscription = require('./models/subscriptions');
const Website = require('./models/websites');
const { request } = require('express');


// sha256 hash
const sha256 = require('sha256');


dotenv.config()
const port = process.env.PORT || 8000;

// ============= Scraper Connection =============

const http_rss_options = {
    hostname: 'scraper',
    port: 3000,
    path: '/new_rss_url',
    method: 'POST',
}

const http_url_options = {
    hostname: 'scraper',
    port: 3000,
    path: '/new_url',
    method: 'POST',
}

// setup axios instance
const scraper = axios.create({
    baseURL: 'http://scraper:3000',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});


// ============= MongoDB Connection =============

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;

const url = `mongodb://${mongo_username}:${mongo_password}@mongo/`;

mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });


const app = express();
// app.use(express.urlencoded());


// ====================== Redis ======================

let redisClient;

(async() => {
    // create redis client
    redisClient = Redis.createClient({
        socket: {
            host: 'cache', // redis container has been given the hostname cache, simplifies things
            port: 6379 // default port
        },
        password: 'foobared' // default password, should change
    });

    // redis error handler
    redisClient.on("error", (error) => console.error("Redis Error: " + error));

    // asynchronous connection instantation
    await redisClient.connect().then(() => {
        console.log('Connected to Redis');
    }).catch((err) => {
        console.error(`Error connecting to Redis. \n${err}`);
    });
})();


// ========= Express Middleware =========

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());


// ================== Express Routes ==================
// ====================================================


app.get("/", function(req, res) {
    res.send("Hello, world!");
});

app.get("/api/highlights", function(req, res) {
    res.json({ message: "Testing GET ROUTE" });
});

app.post("/api/gethighlights", function(req, res) {
    console.log("POST request received");
    console.log(req.body);
    res.json({ message: "Testing POST ROUTE" });
});


app.get('/api/subscriptions', async(req, res) => {
    console.log("[SUBSCRIPTIONS] Getting All Subscriptions");

    res.status(200).send(['Free', 'Pro', 'Premium'])
})


// User Routes =========

// Check if user exists in database otherwise add them
app.post('/api/user', async(req, res) => {
    console.log("[USER] Checking if User Exists")
    
    const userObject = req.body;
    // extracting common part of usertoken and hashing it
    userObject.userToken = sha256(userObject.userToken.split('.')[0]);
    
    User.findOne({ userToken: userObject.userToken }, (err, user) => {
        if (err) {
            console.error("ERROR:", err);
            res.status(500).send(err);
        } else if (user) {
            console.log('[USER] User Already Exists');
            res.status(200).send(user);
        } else {
            const newUser = new User(userObject);

            console.log("[USER] Created New User");

            newUser.save((err, user) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    console.log('User added to database');
                    res.status(200).send(user);
                }
            });
        }
    });
});

app.post('/api/user/details', async(req, res) => {
    console.log("[USER] Checking if User Exists")
    
    const userObject = req.body;
    // extracting common part of usertoken and hashing it
    
    User.findOne({ email: userObject.userId }, (err, user) => {
        if (err) {
            console.error("ERROR:", err);
            res.status(500).send(err);
        } else if (user) {
            console.log('[USER] User Already Exists');
            res.status(200).send(user);
        } else {
            console.log('[USER] Not Found');
            res.status(404).send();            
        }
    });
});


// Subscription Routes =========

// Get the subscription of a user
app.post('/api/user/getSubscription', async(req, res) => {
    console.log("[USER] Fetching Subscription Tier");

    const userObject = req.body;
    console.log("getSubs", userObject);
    
    User.findOne({ email: userObject.userId }, (err, user) => {
        if (err) {
            console.error("ERROR:", err);
            res.status(500).send(err);
        } else if (user) {
            console.log('[USER] Found', user.subscriptionTier);
            res.status(200).json({subscriptionTier: user.subscriptionTier});
        } else {
            console.log('[USER] Not Found');
            res.status(404).send();
        }
    });
});

// set the user's subscription tier
app.post('/api/user/setSubscription', async(req, res) => {
    console.log("[USER] Setting Subscription Tier");
    
    const userObject = req.body.userObject;
    const subscriptionObject = req.body.subscriptionObject;

    User.findOne({ email: userObject.userId }, (err, user) => {
        if (err) {
            console.error("ERROR:", err);
            res.status(500).send(err);
        } else if (user) {
            console.log('[USER] Found');
            user.subscriptionTier = subscriptionObject.subscriptionTier;
            user.save((err, user) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    console.log('[USER] User subscription updated');
                    res.status(200).send(user);
                }
            });
        } else {
            console.log('[USER] Not Found');
            res.status(404).send({ status: 404 });
        }
    })
});
// Website Routes =========

// Get current websites of a user 
app.post('/api/user/getWebsites', async(req, res) => {
    console.log('[USER] Fetching Websites');

    const userObject = req.body;
    console.log("getWebsites", userObject.userId);
    User.findOne({ email: userObject.userId }, (err, user) => {
        if (err) {
            console.error("ERROR:", err);
            res.status(500).send(err);
        } else if (user) {
            console.log('User found', user.websites);
            res.status(200).send({websites: user.websites});
        } else {
            console.log('User not found');
            res.status(404).send();
        }
    });
});

// Add a website to a user (RSS)
app.post('/api/user/websites/addRss', async(req, res) => {
    console.log("[USER] Adding RSS Website")

    const userObject = req.body.userObject;
    const websiteObject = req.body.websiteObject;

    console.log(req.body)

    scraper.post('/new_rss_url', websiteObject)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });

    User.findOne({ email: userObject.userId }, (err, user) => {
        if (err) {
            console.error("ERROR:", err);
            res.status(500).send(err);
        } else if (user) {
            console.log('[USER] Found');

            // check user subscription tier
            if (user.subscriptionTier === 1) {
                if (user.websites.length >= 3) {
                    console.log('[USER] Subscription Tier 1 Limit Reached');
                    res.status(403).send();
                    return;
                }
            } else if (user.subscriptionTier === 2) {
                if (user.websites.length >= 10) {
                    console.log('[USER] Subscription Tier 2 Limit Reached');
                    res.status(403).send();
                    return;
                }
            }

            user.websites.push(websiteObject);
            user.save((err, user) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    console.log('[USER] User website added');
                    res.status(200).send(user);
                }
            });
        } else {
            console.log('[USER] Not Found');
            res.status(404).send();
        }
    })
});

// Add a website to a user (Scrape)
app.post('/api/user/websites/addScrape', async(req, res) => {
    console.log("[USER] Adding Scraping Website")

    const userObject = req.body.userObject;
    const websiteObject = req.body.websiteObject;

    scraper.post('/new_scrape_url', websiteObject)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });

    User.findOne({ email: userObject.email }, (err, user) => {
        if (err) {
            console.error("ERROR:", err);
            res.status(500).send
        } else if (user) {
            console.log('[USER] Found');

            // check user subscription tier
            if (user.subscriptionTier === 1) {
                if (user.websites.length >= 3) {
                    console.log('[USER] Subscription Tier 1 Limit Reached');
                    res.status(403).send();
                    return;
                }
            } else if (user.subscriptionTier === 2) {
                if (user.websites.length >= 10) {
                    console.log('[USER] Subscription Tier 2 Limit Reached');
                    res.status(403).send();
                    return;
                }
            }

            user.websites.push(websiteObject);
            user.save((err, user) => {
                if (err) {
                    console.log(err);
                    res.status(500).send
                } else {
                    console.log('[USER] User website added');
                    res.status(200).send(user);
                }
            });
        } else {
            console.log('[USER] Not Found');
            res.status(404).send();
        }
    });
});

// get articles for a website
app.post('/api/websites/getArticles', async(req, res) => {
    console.log('[WEBSITE] Fetching Articles');

    const newsletter = req.body.website;

    Article.find({ newsletter: newsletter }, (err, articles) => {
        if (err) {
            console.error("ERROR:", err);
            res.status(500).send(err);
        } else if (articles) {
            console.log('[WEBSITE] Articles found');
            res.status(200).send({articles: articles});
        } else {
            console.log('[WEBSITE] Articles not found');
            res.status(404).send();
        }
    });
});


// Article Routes =========

app.get("/api1", function(req, res) {
    res.json({ message: "Article 1" });
});

app.post("/api2", function(req, res) {
    console.log(req.body);
    const rss_url = new rssUrl(req.body);
    console.log(rss_url.name)
})

app.get("/api3", function(req, res) {
    Article.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.post("/mongoTest", async(req, res) => {
    // create new mongodb document instance based on mongoose model
    const article = new Article(req.body);
    console.log(article);

    // push to mongo database
    try {
        const newArticle = await article.save();
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})


app.post("/redisSet", async(req, res) => {
    console.log(req.body);
    await redisClient.set(req.body.key, JSON.stringify(req.body.value));
    res.json({ message: "Redis Set" });
})

app.get("/redisGet", async(req, res) => {
    console.log(req.body);
    const cachedResults = await redisClient.get(req.body.key);
    res.json({ message: cachedResults });
})

// create get request
app.get("/api", async(req, res) => {
    // get all articles from mongodb
    const articles = await Article.find();
    // send articles as json response
    res.json(articles);
});

// const dbo = require('./db/conn');

// const rssUrlSchema = new mongoose.Schema({
//     name: String,
//     url: String,
//     description: String,
// })

// const rssUrl = mongoose.model('rssUrl', rssUrlSchema);

// dbo.connectToServer(function(err) {
//     if (err) {
//         console.error(err);
//         process.exit()
//     }

//     
// })




// ==================================================================

app.listen(port, () => {
    console.log("Server is running at port " + port);
});