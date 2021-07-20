const express = require('express');
const { ObjectId } = require('mongodb');

let todosApi = express.Router();

todosApi.get('/', (req, res) => {
  req.db.collection('todos').find({}).sort({createdDate: -1}).toArray()
  .then(records => res.json(records));
});

todosApi.post('/', (req, res) => {
  if (!req.body.completed) req.body.completed = false;
  
  req.db.collection('todos').insertOne({...req.body, createdDate: new Date()})
  .then(({insertedId}) => res.json({...req.body, _id: insertedId}));
});

todosApi.delete('/', (req, res) => {
  req.db.collection('todos').deleteOne({ _id: ObjectId(req.body._id) })
  .then(() => res.sendStatus(200));
});

todosApi.patch('/', (req, res) => {
  let {_id, ...fieldsToUpdate} = req.body;
  if (fieldsToUpdate) {
    req.db.collection('todos').updateOne({ _id: ObjectId(_id) }, { $set: { ...fieldsToUpdate } })
    .then((() => res.json({_id, ...fieldsToUpdate})));
  } else {
    res.json({_id});
  }
  
});

module.exports = {
  todosApi
}