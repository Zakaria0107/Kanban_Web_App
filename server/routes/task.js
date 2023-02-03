const express = require("express")
const router = express.Router()
const {addTask  , updateTask  , deleteTaks  } = require("../controllers/taskController")
const {requireSignIn , isAuth} = require('./../middleware/isAuth')
const {userById} = require('./../controllers/usercontroller')

router.post("/:Uid/:boardId/:columnId" , requireSignIn , isAuth , addTask)
router.put("/:Uid/:boardId/:columnId/:taskId" , requireSignIn , isAuth ,  updateTask )
router.delete("/:Uid/:boardId/:columnId/:taskId"  , requireSignIn , isAuth , deleteTaks)

router.param('Uid', userById)
module.exports = router 