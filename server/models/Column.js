const mongoose = require("mongoose")


const columnSchema = new mongoose.Schema({
    name : {
        type : String 
    },
    boardId : {
        type : mongoose.ObjectId 
    },
    tasks : {
        type : []
    }
})

module.exports = mongoose.model("Column" , columnSchema)