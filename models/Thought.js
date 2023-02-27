const { Schema, model } = require ('mongoose'); 

/// model schema for the user ///
const thoughtSchema = new Schema({
    thoughtText:{
        type: String, 
        required: true, 
        min: [1, 'no text included'],
        max: 280},
    userID:{ 
        type: String, 
        required: true, 
        },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    }, 
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }    
    
    ); 

    
/// use mongoose.model() to create the model ///
const Thought = model('thought',thoughtSchema); 

module.exports = Thought; 