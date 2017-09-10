const {Todo} = require('./../server/models/todo');
const {mongoose} = require('./../server/db/mongoose');

Todo.remove({})
  .then((result) => {
    console.log(result);
  });
