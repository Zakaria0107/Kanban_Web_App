const Board = require('./../models/Board')
const Column = require('./../models/Column')
const Task = require('./../models/Task')


exports.getAllBoards = (req , res) => {
    let query = Board.find({user_Id : req.params.Uid})
    query.exec((err , data) => { 
        if(err)
            return res.status(404).json({error : err})
        res.send(data)
    })
}


exports.getOneBoard = (req , res) => {
    let query  = Board.findOne({_id : req.params.boardId ,   user_Id : req.params.Uid})

    query.exec((err , data) => {
        if(err)
            return res.status(404).json({error : err})
        res.send(data)
    })
}



exports.AddBoard = (req , res) => {
    if(req.body.name == "")
        return res.status(400).json({error : "Empty board name "})
    
    const board = new Board({name : req.body.name  , user_Id : req.params.Uid })
    let columns = []
    req.body.columns.forEach((element , index )=> {
        columns[index] = new Column({name : element.name  , tasks : []  , boardId : board._id})
        columns[index].save((err , data )=> {
            if(err) {
                return res.status(400).json({error: err})
            }
        })
    });
    board.columns = columns
    board.save((err, data) => {
        if(err) {
            return res.status(400).json({error: err})
        }
        res.send(data)
    })
}


exports.deleteBoard = (req, res) => {
    // delete  all columns of the board
    let query = Column.deleteMany({bordId : req.params.boardId , user_Id : req.params.Uid})
    query.exec((err , data) => {
        if(err) {
            return res.status(400).json({error: err})
        }
    })

    // delete all tasks of the board
    query = Task.deleteMany({boardId: req.params.boardId })
    query.exec((err , data) => {
        if(err) {
            return res.status(400).json({error: err})
        }
    })

    //delete the board
    query = Board.deleteOne({_id : req.params.boardId })
    query.exec((err , data) => {
        if(err) {
            return res.status(400).json({error: err})
        }
        res.send(data)
    })
}

exports.addColumns = (req , res ) => {
    let {boardId} = req.params.boardId
    let columns = []
    req.body.columns.forEach((element , index )=> {
        columns[index] = new Column({name : element.name  , tasks : []  , boardId : req.params.boardId})
        columns[index].save((err , data)=> {
            if(err) {
                return res.status(400).json({error: err})
            }
        })
    });


    let query = Board.findByIdAndUpdate({_id : req.params.boardId , user_Id : req.params.Uid} , {$push : {columns : { $each: columns }}})
    query.exec((err , data) => {
        if(err) 
            return res.status(400).json({err : err})
        res.send(data)
    })

}

exports.updateBoard = (req , res) => {
    let columnsIds = []
    let tasksIds = []
    req.body.columns.forEach(elt => {
        columnsIds.push(elt._id)
        elt.tasks.forEach(elt1 => tasksIds.push(elt1._id))
    })

    let query = Column.deleteMany({boardId : req.params.boardId , _id : {$nin : [...columnsIds]} })
    query.exec((err , data) => {
        if(err) 
        return res.status(400).json({err : err})
        
    })

    req.body.columns.forEach(elt => {
        query = Column.updateOne({_id : elt._id} , elt )
        query.exec((err , data) => {
            if(err) 
            return res.status(400).json({err : err})
            
        })
    })

    query = Task.deleteMany({boardId : req.params.boardId , _id : {$nin : [...tasksIds]} })
    query.exec((err , data) => {
        if(err) 
        return res.status(400).json({err : err})
        
    })

    query = Board.updateOne({_id : req.params.boardId} , req.body)
    query.exec((err , data) => {
        if(err) 
        return res.status(400).json({err : err})
        res.send(data)
    })
}