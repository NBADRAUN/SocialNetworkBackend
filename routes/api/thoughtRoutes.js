const express = require('express'); 
const db = require('../../config/connection'); // creates the connection with MongoDB // 
const router = express.Router(); 
const mongoose = require('mongoose'); 
const { ObjectId } = require('mongodb');
const Thought = require('../../models/Thought');





//// test route////
router.get('/test', (req, res) => {
    res.send('This is the test user route'); 
}); 


//// get all Users using Mongoose find filter //// 
router.get('/', (req, res) => {
  Thought.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('ServerError!');
      res.status(500).json({ message: 'ServerError!' });
    }
  });
});

//// find one user using Mongoose find filter (by ID) //// 
router.get('/:id', (req, res) => {
  Thought.find({_id:ObjectId(req.params.id)}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('ServerError!');
      res.status(500).json({ message: 'ServerError!' });
    }
  });
});


/// post new user using Mongoose model //// 
router.post('/', (req, res) => {
  const newThought = new Thought(
    { 
      thoughtText: req.body.thought,
    }); 
    newThought.save(); 
    if (newThought) {
      res.status(200).json(newThought);
    } else {
      console.log('ServerError');
      res.status(500).json({ message: 'ServerError' });
    }
  }); 



/// update user using Mongoose by findoneandupdate route by finding ID //// 
router.post('/update/:id', (req, res) => {
  Thought.findOneAndUpdate(
    {_id:ObjectId(req.params.id)},
    { username: req.body.username,
      email: req.body.email, 
    },
    { new: true },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log('ServerError!');
        res.status(500).json({ message: 'ServerError!' });
      }
    }
  );
});

  
/// delete user using Mongoose models by findoneanddelete using ID /// 
router.delete('/:id', (req, res) => {
  Thought.findOneAndDelete({_id:ObjectId(req.params.id)}, (err, result) => {
    if (result) {
      res.status(200).json(result);
      // console.log(`Deleted: ${result}`);  /// this would console.log what happened can be used in any CRUD /// 
    } else {
      console.log('ServerError!');
      res.status(500).json({ message: 'ServerError!' });
    }
  });
});




module.exports = router; 

