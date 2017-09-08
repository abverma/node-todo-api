var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp',{
  useMongoClient: true
});

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

var newTodo = new Todo({
  text: 'Masturbate  ',
  completed: false,
  completedAt: 1234
});

newTodo.save()
  .then((doc) => {
    console.log('Saved doc', doc);
  }, (err) => {
    console.log('Unable to save todo', err);
  });
