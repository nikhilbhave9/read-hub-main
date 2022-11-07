const { MongoClient } = require('mongodb');
const connectionString = 'mongodb://localhost:27017/urls';
const client = new MongoClient(connectionString, { useUnifiedTopology: true, useNewUrlParser: true });

let dbConnection;

module.exports = {
    connectToServer: function(callback) {
        client.connect(function(err, db) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db.db('urls');
            console.log('Connected to MongoDB');

            return callback();
        })
    },

    getDb: function() {
        return dbConnection;
    }
}