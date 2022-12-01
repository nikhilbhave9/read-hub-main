const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const websiteSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    articlesArray : { type : Array , "default" : [] }
});

const Website = mongoose.model('Website', websiteSchema);
module.exports = Website;