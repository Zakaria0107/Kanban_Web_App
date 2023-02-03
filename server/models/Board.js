const mongoose = require("mongoose")

const boardSchema = new mongoose.Schema({
    name : {
        type : String
    },
    columns : {
        type : []
    },
    user_Id : {
        type : String
    }
})

module.exports = mongoose.model("Board" , boardSchema)