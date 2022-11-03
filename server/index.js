import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.get("/", function(req, res) {
    res.send("Hello, world!");
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server is running at port " + port);
});