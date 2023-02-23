const mongoose = require('mongoose'); 
const User = require('../models/User'); 
const { Schema, model } = require('mongoose');


/// model schema for the user ///
const thoughtSchema = new Schema({
    thoughtText:{
        type: String, 
        required: true, 
        min: [1, 'no text included'],
        max: 280},
    createdAt: {
        type: Date, 
        default: Date.now},
    }); 
    

/// use mongoose.model() to create the model ///
const Thought = model('Thought',thoughtSchema); 


module.exports = Thought; 