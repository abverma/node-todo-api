const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server...');
  }
  console.log('Connected to mongodb server...');

  db.collection('Users').findOneAndUpdate({age: 32}, {name: 'Abhishek', age: 31, location:'Bengaluru'}).then((result) =>{
    console.log(JSON.stringify(result, undefined, 2));
  }, (err) => {
    console.log('Unable to get todo documents');
  })
  //db.close();
});
