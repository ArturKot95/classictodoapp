const { MongoClient } = require('mongodb');

const URI = 'mongodb://localhost:27017';
let client = new MongoClient(URI);

function connectToDatabase() {
  return client.connect()
    .then(() => client.db('todoapp'));
}

module.exports = connectToDatabase;