const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: String,
    status:{
        type: String,
        enum: ['active', 'inactive']
    },
    date:{
        type: Date,
        default: Date.now,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    }
})

// instance method
todoSchema.methods = {
    findActive: function(stat){
        return mongoose.model("Todo").find({status: stat})
    }
}

// static methods:
todoSchema.statics={
    findInActive: function(stat){
        return this.find({status: stat})
    }
}

// query Helpers:
todoSchema.query={
    byTitle: function(tit){
        return this.find({title: new RegExp(tit, "i")}) //can use any operation but i am finding using redX
    }
}

module.exports = todoSchema;