const mongoose = require('mongoose'); 

/// model schema for the user ///
const userSchema = new mongoose.Schema({
    username:{
        type: String, 
        required: true, 
        unique: true},
    email: {
        type: String, 
        required: true, 
        unique: true, 
        match:/.+\@.+\..+/},
    // thoughts: [thoughtsSchema],
    // friends: [friendsSchema],
}); 

/// use mongoose.model() to create the model ///
const  User = mongoose.model('User',userSchema); 


module.exports = User; 