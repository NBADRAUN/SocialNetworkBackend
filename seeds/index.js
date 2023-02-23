const db = require('../config/connection'); // creates the connection with MongoDB // 
const mongoose = require('mongoose'); 
const User = require('../models/User'); 
const Thought = require('../models/Thought'); 




mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,})
  .then(() => {
    console.log('MONGO CONNECTION OPEN'); 
  })
  .catch((err) => {
    console.log(err); 
  }); 

  const seedUsers = [
    {username: 'User1', email: 'User1@test.com'},
    {username: 'User2', email: 'User2@test.com'},
    {username: 'User3', email: 'User3@test.com'},
    {username: 'User4', email: 'User4@test.com'},
  ] 

  // const seedThoughts = [
  //   {thoughtText: 'Thought1fromUser1',username: 'User1'}, 
  //   {thoughtText: 'Thought1fromUser2',username: 'User2'}, 
  //   {thoughtText: 'Thought1fromUser3',username: 'User3'}, 
  //   {thoughtText: 'Thought1fromUser4',username: 'User4'}, 
  // ]



const seedDB = async () => {
    await User.deleteMany({}); 
    await Thought.deleteMany({}); 
    await console.log('Deleted all previous data in User document'); 
    const Users = await User.insertMany(seedUsers); 
    console.log(Users); 
    // await Thought.insertMany(seedThoughts); 
    await console.log('seeded users and thoughts in DB'); 
}; 

seedDB().then(() => {
    mongoose.connection.close(); 
    console.log('MONGO CONNECTION CLOSED'); 
}); 