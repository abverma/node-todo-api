const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server...');
  }
  console.log('Connected to mongodb server...');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Lunch'}).then((result) =>{
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to get todo documents');
  // })
  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) =>{
  //   console.log(result.result);
  // }, (err) => {
  //   console.log('Unable to get todo documents');
  // })

  //findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed: false}).then((result) =>{
    console.log(result);
  }, (err) => {
    console.log('Unable to get todo documents');
  })
  //db.close();
});
