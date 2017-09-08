const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server...');
  }
  console.log('Connected to mongodb server...');

  db.collection('Todos').find({_id: ObjectId('59b281a0f539ca18c3383059')}).toArray().then((docs) =>{
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to get todo documents');
  })

  //db.close();
});
