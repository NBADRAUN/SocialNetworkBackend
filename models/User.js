const { Schema, model } = require ('mongoose'); 

/// model schema for the user ///
const userSchema = new Schema({
    username:{
        type: String, 
        required: true, 
        unique: true},
    email: {
        type: String, 
        required: true, 
        unique: true, 
        match:/.+\@.+\..+/},

    thoughts:[{ type: Schema.Types.ObjectId, ref: 'thought'}],

},
{
    toJSON: { 
        virtuals: true,
    },
    id: false,
},

); 

/// use mongoose.model() to create the model ///
const User = model('user',userSchema); 


module.exports = User; 