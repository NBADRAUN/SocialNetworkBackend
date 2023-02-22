const express = require('express'); // creates the server using express // 
const db = require('./config/connection'); // creates the connection with MongoDB // 
const app = express(); // middleware for API functions 
app.use(express.json()); // adds the express function to produce data as JSON // 
app.use(express.urlencoded({ extended: true }));  // middleware to parse incoming requests 


// const data = require('./models'); 

///create a server using express on port 3001///
const PORT = process.env.PORT || 3001;





/// server opens port to use /// 
app.listen(PORT, () => {
console.log(`Example app listening at http://localhost:${PORT}`);
});





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