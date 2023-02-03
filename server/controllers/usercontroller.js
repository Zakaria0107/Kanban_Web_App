const User = require('./../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")


exports.signUp = async (req , res) => {
    const {name, email , password , passwordRep} = req.body
    if(password != passwordRep)
        return res.status(400).json({error : "Passwords not match"})

    try {
        // Hashing passwords
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        const user = new User({name , email , password :  hashed})

        user.save((err , data) => {
            if(err)
                return res.status(400).json({err : err })
            res.send(data)
        })
    }catch(err){
        return res.status(400).json({err : err })
    }
}




exports.signIn = (req ,  res) => {
    const {email , password} = req.body

    try {
        User.findOne({email}, async (err, user) => {
            if(err || !user) {
                return res.status(400).json({error: "This user doesn't exist"})
            }
            const isValid = await bcrypt.compare(password, user.password);
            if(!isValid) {
                return res.status(401).json({error: "Wrong email or password"})
            }

            //expire after 1 hours exp: Math.floor(Date.now() / 1000) + (60 * 60)
            const token = jwt.sign({_id: user._id, exp: Math.floor(Date.now() / 1000) + (240 * 60)}, process.env.JWT_SECRET, { algorithm: 'HS256' }); 

            const {_id, email , name} = user;

            return res.json({_id, email , name , token})
        })
    }
    catch(err) {
        return res.status(400).json({err : err })
    }
}



exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(404).json({
                error: "no user"
            })
        }

        req.profile = user;
        next();
    })
}

exports.getOneUser = (req, res) => {
    res.json({
        user: req.profile._id
    })
}
