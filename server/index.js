const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Redis = require('redis');
const dotenv = require('dotenv');

const Article = require('./models/articles');

dotenv.config()

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;

const url = `mongodb://${mongo_username}:${mongo_password}@mongo/`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'content'})
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });



const app = express();
// app.use(express.urlencoded());

let redisClient;

(async () => {
    redisClient = Redis.createClient({
        socket: {
            host: 'cache',
            port: 6379
        },
        password: 'foobared'
    });

    redisClient.on("error", (error) => console.error("Redis Error: " + error));

    await redisClient.connect().then(() => {
        console.log('Connected to Redis');
    }).catch((err) => {
        console.error(`Error connecting to Redis. \n${err}`);
    });
})();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

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

app.post("/mongoTest", async (req, res) => {
    console.log(req.body);

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

    await redisClient.set(req.body.key_, JSON.stringify(req.body.value_));

    // redisClient.set(req.body.key_, req.body.value_, function(err, reply) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(reply);
    //     }
    // })

    res.json({ message: "Redis Set" });
})

app.get("/redisGet", async (req, res) => {
    console.log(req.body);
    // redisClient.get(req.body.key_, function(err, reply) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(reply);
    //     }
    // })

    const cachedResults = await redisClient.get(req.body.key_);

    // try {
    //     const reply = await getAsync(req.body.key_);
    //     console.log(reply);
    // } catch (error) {
    //     console.log(error);
    // }

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

app.listen(port, () => {
    console.log("Server is running at port " + port);
});