const express = require("express")
const router = express.Router()
const {addTask  , updateTask  , deleteTaks  } = require("../controllers/taskController")

router.post("/:boardId/:columnId" , addTask)
router.put("/:boardId/:columnId/:taskId" , updateTask )
router.delete("/:boardId/:columnId/:taskId"  , deleteTaks)
module.exports = router 