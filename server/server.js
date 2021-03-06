var env = process.env.NODE_ENV || 'development';
console.log('env ****', env);
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

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

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({
        todo
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {
      $set: body
    }, {
      new: true
    })
    .then((todo) => {
        if (!todo) {
            return res.send(404).send();
        }
        res.send({todo});
    })
    .catch((err) => {
      res.status(400).send();
    })
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  console.log(body);

  var user = new User(body);

  user.save()
    .then(() =>{
      return user.generateAuthTokens();
    })
    .then((token) => {
        res.header('x-auth', token).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});

module.exports = {
  app
};
