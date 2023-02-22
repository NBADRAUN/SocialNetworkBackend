const express = require('express');
const mongodb = require('mongodb').MongoClient;
// const data = require('./models'); 

///create a server using express on port 3001///
const app = express();
const port = 3001;

// Connection string to local instance of MongoDB including database name
const connectionStringURI = `mongodb://127.0.0.1:27017/socialnetworkDB`;

// Declare a variable to hold the connection
let db;

const test = [
  {number: '1'},
  {number: '2'}, 
]


// Creates a connection to a MongoDB instance and returns the reference to the database
mongodb.connect(
  // Defines connection between app and MongoDB instance
  connectionStringURI,
  // Sets connection string parser and Server Discover and Monitoring engine to true and avoids warning
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    // Use client.db() constructor to add new db instance
    db = client.db();
    db.collection('numbers').deleteMany({}); 
    db.collection('numbers').insertMany(test,(err,res) => {
      if (err) {
        return console.log(err); 
      } 
      console.log('data inserted'); 
    })



    /// server opens port to use /// 
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
);



app.use(express.json());

app.post('/create', (req, res) => {
  // Use db connection to add a document
  db.collection('numbers').insertOne(
    { number: req.body.number},
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.get('/read', (req, res) => {
  // Use db connection to find all documents in collection
  db.collection('numbers')
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});