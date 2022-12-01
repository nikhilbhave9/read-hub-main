const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    newsletter: {
        type: String,
        required: true
    },
    pubDate: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
});

const myDb = mongoose.connection.useDb('content');
const Article = myDb.model('Article', articleSchema);
module.exports = Article;