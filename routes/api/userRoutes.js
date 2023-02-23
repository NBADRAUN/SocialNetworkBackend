const express = require('express'); 
const db = require('../../config/connection'); // creates the connection with MongoDB // 
const router = express.Router(); 
const mongoose = require('mongoose'); 
const userModel = require('../../models/User'); 
const { ObjectId } = require('mongodb');




//// test route////
router.get('/test-user', (req, res) => {
    res.send('This is the test user route'); 
}); 


//// get all Users //// 
router.get('/', (req, res) => {
  userModel.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('ServerError!');
      res.status(500).json({ message: 'ServerError!' });
    }
  });
});

//// find one user by ID //// 
router.get('/:id', (req, res) => {
  userModel.find({_id:ObjectId(req.params.id)}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('ServerError!');
      res.status(500).json({ message: 'ServerError!' });
    }
  });
});


//// post new user //// 
router.post('/', (req, res) => {
  // Use db connection to add a document
  db.collection('users').insertOne(
    { 
      username: req.body.username,
      email: req.body.email, 
      thoughts: [], 
    },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});



/// delete user //// 
router.delete('/:id', (req, res) => {
  db.collection('users')
    .deleteOne({_id:ObjectId(req.params.id)},
    (err, results) => {
      if (err) throw err;
      res.json(results); 
    }
  );
});


/// update user by finding ID //// 
router.post('/find-one-update/:id', (req, res) => {
  userModel.findOneAndUpdate(
    {_id:ObjectId(req.params.id)},
    { username: req.body.username,
      email: req.body.email, 
    },
    { new: true },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Updated: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
      }
    }
  );
});


  




module.exports = router; 

