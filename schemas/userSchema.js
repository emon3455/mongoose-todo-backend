const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ['active', 'inactive']
    },
    todo:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Todo"
        }
    ]
})

module.exports = userSchema;