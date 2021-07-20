const express = require('express');
const { ObjectId } = require('mongodb');

let todosApi = express.Router();

todosApi.get('/', (req, res) => {
  req.db.collection('todos').find({}).toArray()
  .then(records => res.json(records));
});

todosApi.post('/', (req, res) => {
  req.db.collection('todos').insertOne(req.body)
  .then(({insertedId}) => res.json({...req.body, _id: insertedId}));
});

todosApi.delete('/', (req, res) => {
  req.db.collection('todos').deleteOne({ _id: ObjectId(req.body._id) })
  .then(() => res.sendStatus(200));
});

todosApi.patch('/', (req, res) => {
  let {_id, ...updatedTodo} = req.body;
  req.db.collection('todos').updateOne({ _id: ObjectId(_id) }, { $set: { ...updatedTodo } })
  .then((({upsertedId}) => res.json({_id: upsertedId, ...updatedTodo})));
});

module.exports = {
  todosApi
}