const Task = require('./../models/Task')
const Column = require('./../models/Column') 
const Board = require('../models/Board')





exports.addTask = (req , res) => {
    const { boardId, columnId, Uid} = req.params 
    let task = new Task({...req.body , boardId : boardId , columnId : columnId})

    let query = Column.updateOne({_id : req.params.columnId}, { $push : { tasks : task }})

    query.exec((err , data) => {
        if(err) return res.status(400).json({err : err})
    })

    query = Column.find({ boardId : boardId})
    query.exec((err , data) => {
        if(err) return res.status(400).json({err : err})
        query = Board.findByIdAndUpdate({ _id : boardId  , user_id : Uid} ,  {$set: { columns : data}} ) 
        query.exec((err , data) => {
            if(err) return res.status(400).json({err : err})
        })
    })

    task.save((err , data) => {
        if(err) return res.status(400).json({error: err})
            
        res.send(data)
    })
}




exports.updateTask =  (req , res) => {
    const { boardId, columnId , taskId  , Uid} = req.params 

    let query = Task.findByIdAndUpdate({_id : taskId} , {...req.body , boardId : boardId })
    query.exec((err , data) => {
        if(err) return res.status(400).json({error: err})
        query = Column.updateOne({_id : columnId} ,  {$pull: {tasks : { _id : data._id}}}) 
        query.exec((err , data) => {
            if(err) return res.status(400).json({error: err})
            query = Task.findById({_id : taskId})
            query.exec((err , data) => {
                if(err) return res.status(400).json({err : err})
                let query = Column.updateOne({_id : data.columnId}, { $push : { tasks : data }})
                query.exec((err , data) => {
                    if(err) return res.status(400).json({err : err})
                    query = Column.find({ boardId : boardId})
                    query.exec((err , data) => {
                        if(err) return res.status(400).json({err : err})
                        query = Board.findByIdAndUpdate({ _id : boardId  , user_id : Uid} ,  {$set: { columns : data}} ) 
                        query.exec((err , data) => {
                            if(err) return res.status(400).json({err : err})
                            res.send(data)
                        })
                    })
                })
            })

        })
    })
}



exports.deleteTaks = (req , res) => {
    const { boardId , taskId, columnId , Uid} = req.params 
    let query = Task.findByIdAndDelete({_id : taskId})
    query.exec((err , data) => {
        if(err) return res.status(400).json({err: err})
        query = Column.updateOne({_id : columnId} ,  {$pull: {tasks : { _id : data._id}}}) 
        query.exec((err , data) => {
            if(err) return res.status(400).json({err : err})
            query = Column.find({ boardId : boardId})
                query.exec((err , data) => {
                    if(err) return res.status(400).json({err : err})
                    query = Board.findByIdAndUpdate({ _id : boardId , user_id : Uid } ,  {$set: { columns : data}} ) 
                    query.exec((err , data) => {
                        if(err) return res.status(400).json({err : err})
                        res.send(data)
                    })
                })
        })
    })
}