import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const dbo = require('./db/conn');

const app = express();
// const router = express.Router();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

// const rssUrlSchema = new mongoose.Schema({
//     name: String,
//     url: String,
//     description: String,
// })

// const rssUrl = mongoose.model('rssUrl', rssUrlSchema);

dbo.connectToServer(function(err) {
    if (err) {
        console.error(err);
        process.exit()
    }

    app.listen(port, () => {
        console.log("Server is running at port " + port);
    });
})

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