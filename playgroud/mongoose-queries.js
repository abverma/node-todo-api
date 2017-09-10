const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '59b30a8473da1a1fb2cce50d';

User.findById(id)
.then((user) => {
  if (!user) {
    return console.log('User with ID not found');
  }
  console.log('User:', user);
})
.catch((err) => {
  consoel.log(err)
});
// var id = '59b4c9fb6a5a21328fede5aa';
//
// if (!Object.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// })
// .then((todos) => {
//   console.log('Todos:', todos);
// });
//
// Todo.find({
//   _id: id
// })
// .then((todo) => {
//   console.log('Todo:', todo);
// });

// Todo.findById(id)
// .then((todo) => {
//   if (!todo) {
//     return console.log('Todo with id not found');
//   }
//   console.log('Todo by id', todo);
// })
// .catch((err) => {
//   console.log(err);
// });
