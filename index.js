const express = require('express');
const connectToDatabase = require('./connectToDatabase');
const path = require('path');
const { todosApi } = require('./api/'); 

connectToDatabase()
.then(db => main(db));

function main(db) {
  let app = express();
  
  app.use(express.json());
  app.use(express.urlencoded());

  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.use('/todos', todosApi);
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  app.listen(3001, () => console.log('Server listening...'));
}