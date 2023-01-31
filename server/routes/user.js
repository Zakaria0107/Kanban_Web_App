const express = require("express")
const router = express.Router()
const {signUp , signIn, getOneUser} = require("./../controllers/userController")
const {requireSignIn , isAuth} = require('./../middleware/isAuth')
const {userById} = require('./../controllers/usercontroller')


router.post('/signup' , signUp)
router.post('/signin' , signIn)
router.get('/:Uid', requireSignIn, isAuth, getOneUser)
router.param('Uid', userById)

module.exports = router
