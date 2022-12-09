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


dotenv.config()
const port = process.env.PORT || 8000;

// ============= Scraper Connection =============

const http_rss_options = {
    hostname: 'scraper',
    port: 7000,
    path: '/new_rss_url',
    method: 'POST',
}

const http_url_options = {
    hostname: 'scraper',
    port: 7000,
    path: '/new_url',
    method: 'POST',
}

// setup axios instance
const scraper = axios.create({
    baseURL: 'http://scraper:7000',
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


// User Routes =========

// Check if user exists in database otherwise add them
app.post('/api/users', async(req, res) => {
    const userObject = req.body;
    User.findOne({ userToken: userObject }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else if (user) {
            console.log('User already exists');
            res.status(200).send(user);
        } else {
            const newUser = new User(userObject);
            newUser.save((err, user) => {
                if (err) {
                    console.log(err);
                    res.status(500).send
                } else {
                    console.log('User added to database');
                    res.status(200).send(user);
                }
            });
        }
    });
});

// Subscription Routes =========

// Get the subscription of a user
app.get('/api/subscriptions', async(req, res) => {
    const userObject = req.query;
    console.log(userObject.userid);
    // Send back an array of subscription
    res.json({
        subscriptions: ["Free", "Premium", "Pro"]
    });

    // Make a fetch request to the database and get all subscriptions 



})


// Website Routes =========

// Get current websites of a user 
app.get('/api/userWebsites', async(req, res) => {
    const userID = req.query.userid;
    console.log("REACHED")
    const userObject = req.body;
    console.log(userObject);

    Article.find({})
        .then((articles) => {
            console.log(articles.length);
            res.send(articles);
        })
        .catch((err) => {
            console.log(err);
            res.send({ status: 404 })
        });
});

// Add a website to a user
app.post('/api/websites/rss', async(req, res) => {
    console.log("POST REACHED")
    const userObject = req.body;
    console.log(userObject);

    const postObject = {
        url: userObject.websiteUrl,
        rss: userObject.rssUrl,
        name: userObject.name
            // description: userObject.description || null,
    }

    // use axios to make a post request to the scraper
    scraper.post('/new_rss_url', postObject)
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.log(err);
        });



    res.json({ message: "Returning POST ROUTE" });
    // Make POST request to python server
    // app.post('scraper/new_rss_url', userObject, (req, res) => {
    //     console.log(res);
    // })
});



// Article Routes =========



// app.post('/api/users', async (req, res) => {
//     const userObject = req.body;
//     User.create(userObject)
//         .then((user) => {
//             res.status(200).json(user);
//         })
//         .catch((err) => {
//             res.status(400).json(err);
//         });
// });



// app.get('/api/users', (req, res) => {
//     User.find({}, (err, users) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.status(200).send(users);
//         }
//     });
// });


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