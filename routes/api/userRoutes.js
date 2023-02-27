const express = require('express'); 
const db = require('../../config/connection'); // creates the connection with MongoDB // 
const router = express.Router(); 
const mongoose = require('mongoose'); 
const { ObjectId } = require('mongodb');
const User = require('../../models/User');
const Thought = require('../../models/Thought');


//// get all Users using Mongoose //// 
router.get('/', (req, res) => {
  User.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('ServerError!');
      res.status(500).json({ message: 'ServerError!' });
    }
  });
});



//// find one user using Mongoose find filter (by _id) //// 
router.get('/:id', (req, res) => {
  User.find({_id:ObjectId(req.params.id)}, (err, result) => {
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
  const newUser = new User(
    { 
      username: req.body.username,
      email: req.body.email,     
    }); 
    newUser.save(); 
    if (newUser) {
      res.status(200).json(newUser);
    } else {
      console.log('ServerError');
      res.status(500).json({ message: 'ServerError' });
    }
  }); 


/// update user using Mongoose by findoneandupdate route by finding _id //// 
router.post('/update/:id', (req, res) => {
  User.findOneAndUpdate(
    {_id:ObjectId(req.params.id)},
    { 
      username: req.body.username,
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


  
/// delete user using Mongoose models by findoneanddelete using _id  /// 
router.delete('/:id', (req, res) => {
  User.findOneAndDelete({_id:ObjectId(req.params.id)}, (err, result) => {
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

