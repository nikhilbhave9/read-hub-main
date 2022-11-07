const express = require('express');

const urlRoutes = express.Router()

const dbo = require('../db/conn');

urlRoutes.route('/rssUrl').post(function(req, res) {
    const dbConnect = dbo.getDb();
    const matchDocument = {
        name: req.body.name,
        url: req.body.url,
        description: req.body.description
    }

    dbConnect
        .collection("rss")
        .insertOne(matchDocument, function(err, result) {
            if (err) {
                res.status(400).send("Error inserting RSS URL")
            } else {
                console.log(`Added a new RSS URL with ID ${result.insertedId}`)
                res.status(204).send()
            }
        })
})

urlRoutes.route('/url').post(function(req, res) {
    const dbConnect = dbo.getDb();
    const matchDocument = {
        name: req.body.name,
        url: req.body.url,
        description: req.body.description
    }

    dbConnect
        .collection("url")
        .insertOne(matchDocument, function(err, result) {
            if (err) {
                res.status(400).send("Error inserting URL")
            } else {
                console.log(`Added a new URL with ID ${result.insertedId}`)
                res.status(204).send()
            }
        })
})