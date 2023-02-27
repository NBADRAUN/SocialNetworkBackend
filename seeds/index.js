const { color, log, red, green, cyan, cyanBright } = require('console-log-colors');
const mongoose = require('mongoose'); 
const User = require('../models/User'); 
const Thought = require('../models/Thought'); 




mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,})
  .then(() => {
    console.log(green('MONGO CONNECTION OPEN')); 
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

 
const seedDB = async () => {
    await User.deleteMany({}); 
    await Thought.deleteMany({}); 
    await console.log(cyan('Deleted all previous data in User document')); 
    const Users = await User.insertMany(seedUsers); 
    await console.log(cyan('seeded users and thoughts in DB')); 
}; 

seedDB().then(() => {
    mongoose.connection.close(); 
    console.log(green('MONGO CONNECTION CLOSED')); 
}); 