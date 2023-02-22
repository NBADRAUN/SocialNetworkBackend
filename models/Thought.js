const mongoose = require('mongoose'); 



/// model schema for the user ///
const thoughtSchema = new mongoose.Schema({
    thoughtText:{
        type: String, 
        required: true, 
        min: [1, 'no text included'],
        max: 280},
    createdAt: {
        type: Date, 
        default: Date.now},
    // username: userSchema,  
    // reactions: [reactionSchema], 
    }); 
    

/// use mongoose.model() to create the model ///
const  Thought = mongoose.model('Thought',thoughtSchema); 


module.exports = Thought; 