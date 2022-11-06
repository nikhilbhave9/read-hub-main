import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
// const router = express.Router();
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

app.get("/", function(req, res) {
    res.send("Hello, world!");
});

app.get("/api1", function (req, res) {
    res.json({message: "Article 1"});
});

app.post("/api2", function (req, res) {
    console.log(req.body);
})

app.listen(port, () => {
    console.log("Server is running at port " + port);
});