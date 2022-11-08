const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Article = require('./models/articles');
const Redis = require('redis');

const url = `mongodb+srv://admin:root@cluster0.s8asufw.mongodb.net/?retryWrites=true&w=majority`;

// const connectionParams={
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true 
// }
mongoose.connect(url)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });


// Redis 
const redisClient = Redis.createClient();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

app.get("/", function(req, res) {
    res.send("Hello, world!");
});

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