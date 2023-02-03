const express = require("express")
const router = express.Router()
const {getAllBoards , getOneBoard , AddBoard , deleteBoard , addColumns , updateBoard} = require("./../controllers/boardControllet")
const {requireSignIn , isAuth} = require('./../middleware/isAuth')
const {userById} = require('./../controllers/usercontroller')

router.get("/:Uid" ,requireSignIn ,isAuth ,   getAllBoards)
router.get("/:Uid/:boardId" , requireSignIn ,isAuth ,  getOneBoard)
router.post("/:Uid" , requireSignIn ,isAuth , AddBoard)
router.post("/:Uid/:boardId" , requireSignIn ,isAuth , addColumns)
router.put("/:Uid/:boardId" , requireSignIn ,isAuth ,  updateBoard)
router.delete("/:Uid/:boardId" , requireSignIn ,isAuth , deleteBoard )

router.param('Uid', userById)
module.exports = router