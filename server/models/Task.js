const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title : {
        type : String 
    }, 
    descreption : {
        type : String
    },
    subTasks : {
        type : [Object]
    }, 
    boardId : {
        type : mongoose.ObjectId 
    },
    columnId : {
        type : mongoose.ObjectId 
    },

})

module.exports = mongoose.model("Task" , taskSchema)