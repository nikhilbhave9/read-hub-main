const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Redis = require('redis');
const dotenv = require('dotenv');

// Mongoose Models
const Article = require('./models/articles');
const User = require('./models/users');
const Subscription = require('./models/subscriptions');
const Website = require('./models/websites');


dotenv.config()
const port = process.env.PORT || 8000;

// ============= MongoDB Connection =============

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;

const url = `mongodb://${mongo_username}:${mongo_password}@mongo/`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
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



// ============== Express Routes ==============

app.get("/", function (req, res) {
    res.send("Hello, world!");
});

app.get("/api1", function (req, res) {
    res.json({ message: "Article 1" });
});

app.post("/api2", function (req, res) {
    console.log(req.body);
    const rss_url = new rssUrl(req.body);
    console.log(rss_url.name)
})

app.get("/api3", function (req, res) {
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


app.post("/redisSet", async (req, res) => {
    console.log(req.body);
    await redisClient.set(req.body.key, JSON.stringify(req.body.value));
    res.json({ message: "Redis Set" });
})

app.get("/redisGet", async (req, res) => {
    console.log(req.body);
    const cachedResults = await redisClient.get(req.body.key);
    res.json({ message: cachedResults });
})



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