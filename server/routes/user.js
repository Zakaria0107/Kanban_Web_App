const express = require("express")
const router = express.Router()
const {signUp , signIn, getOneUser} = require("./../controllers/userController")
const {requireSignIn , isAuth} = require('./../middleware/isAuth')
const {userById} = require('./../controllers/usercontroller')
const {SignInValidator , SignUpValidator} = require("./../middleware/formValidator")

router.post('/signup' ,SignUpValidator ,  signUp)
router.post('/signin' ,SignInValidator ,  signIn)
router.get('/:Uid', requireSignIn, isAuth, getOneUser)
router.param('Uid', userById)

module.exports = router
