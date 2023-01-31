const mongoose = require("mongoose")

const boardSchema = new mongoose.Schema({
    name : {
        type : String
    },
    columns : {
        type : []
    }

})

module.exports = mongoose.model("Board" , boardSchema)