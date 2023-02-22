const express = require('express');
// Run npm install mongodb and require mongodb and MongoClient class
const mongodb = require('mongodb').MongoClient;

const app = express();
const port = 3001;

// Connection string to local instance of MongoDB including database name
const connectionStringURI = `mongodb://127.0.0.1:27017/shelterDB`;

// Declare a variable to hold the connection
let db;

// Creates a connection to a MongoDB instance and returns the reference to the database
mongodb.connect(
  // Defines connection between app and MongoDB instance
  connectionStringURI,
  // Sets connection string parser and Server Discover and Monitoring engine to true and avoids warning
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    // Use client.db() constructor to add new db instance
    db = client.db();
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
);

app.use(express.json());

app.post('/create', (req, res) => {
  // Use db connection to add a document
  db.collection('petCollection').insertOne(
    { name: req.body.name, breed: req.body.breed },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.get('/read', (req, res) => {
  // Use db connection to find all documents in collection
  db.collection('petCollection')
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});


app.post('/create', (req, res) => {
  db.collection('bookCollection').insertOne(
    { title: req.body.title, author: req.body.author },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.post('/create-many', function (req, res) {
  db.collection('bookCollection').insertMany(
    [
      {"title" : "Oh the Places We Will Go!"},
      {"title" : "Diary of Anne Frank"}   /// try to remove one and see if it will still take one vs. many.  ////
    ], 
    (err,results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.get('/read', (req, res) => {
  db.collection('bookCollection')
    .find({})
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

app.delete('/:id', (req, res) => {
  // The title and author will be provided by the request body
  db.collection('bookCollection').deleteOne(
    { id: req.body.id},
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});


app.post('/delete', async (req, res) => {
  try {
    const results = await db.collection('bookCollection').deleteOne({_id: ObjectId(req.body.id)});
    if (!results) {
      res.status(400).json({message: 'No document found with that id!'})
    };
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({message: 'Server error!'});
  }
});
app.post('/update', async(req, res) => {
  try {
    const results = await db.collection('bookCollection').updateOne({title: req.body.title}, {$set: {title: req.body.newTitle}});
    if (!results) {
      res.status(400).json({message: 'No document found with that id!'})
    };
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({message: 'Server error!'});
  }
})



