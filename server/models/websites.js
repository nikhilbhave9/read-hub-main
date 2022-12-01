const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const websiteSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    articlesArray : { type : Array , "default" : [] }
});

const myDb = mongoose.connection.useDb('content');
const Website = myDb.model('Website', websiteSchema);
module.exports = Website;