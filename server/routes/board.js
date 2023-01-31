const express = require("express")
const router = express.Router()
const {getAllBoards , getOneBoard , AddBoard , deleteBoard , addColumns , updateBoard} = require("./../controllers/boardControllet")

router.get("/" ,  getAllBoards)
router.get("/:boardId" , getOneBoard)
router.post("/" , AddBoard)
router.post("/:boardId" , addColumns)
router.put("/:boardId" , updateBoard)
router.delete("/:boardId" , deleteBoard )
module.exports = router