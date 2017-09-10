var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo(req.body);

  todo.save()
    .then((doc) => {
      //console.log('Todo saved successfully');
      res.send(doc);
    }, (err) => {
      //console.log('Unable to save todo', err);
      res.status(400).send(err);
    })
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => {
      res.send({
        todos
      });
    }, (err) => {
      res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({
        todo
      });
    }, (err) => {
      res.status(400).send(err);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});

module.exports = {
  app
};
