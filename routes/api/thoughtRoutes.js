const express = require('express'); 
const db = require('../../config/connection'); // creates the connection with MongoDB // 
const router = express.Router(); 
const mongoose = require('mongoose'); 
const { ObjectId } = require('mongodb');
const Thought = require('../../models/Thought');
const User = require('../../models/User'); 


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


//////////////////// Post new thought and add to user model using _id  ////////////////////
router.post('/', (req, res) => {
  Thought.create(req.body)
    .then((post) => {
      return User.findOneAndUpdate(
        { _id: req.body.userID },
        { $addToSet: { thoughts: post._id,} },
        { new: true }
      );
    })
    .then((user) =>
      !user
        ? res
            .status(404)
            .json({ message: 'thought created but userID not found' })
        : res.json('userID found and thought created')
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}),



/// update user using Mongoose by findoneandupdate route by finding ID //// 
router.post('/update/:id', (req, res) => {
  Thought.findOneAndUpdate(
    {_id:ObjectId(req.params.id)},
    { 
      thoughtText: req.body.thoughtText,
      username: req.body.username
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

//// delete thought and also remove from the userID using _id /////// 
router.delete('/:id', async (req, res) => {
  try {
      await Thought.findByIdAndDelete(req.params.id);
      await User.findOneAndUpdate({thoughts: req.params.id}, {$pull: {thoughts: req.params.id}}, 
      {new: true});
      res.status(200).json({message: 'Thought deleted and removed from user'});
  } catch (error) {
      res.status(400).json('Error finding ID')
  }
});  




module.exports = router; 

