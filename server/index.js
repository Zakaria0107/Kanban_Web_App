const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const expressValidator = require('express-validator')
// routes 
const boardRouter = require("./routes/board")
const taskRouter = require("./routes/task")
const userRouter = require("./routes/user")


const app = express()
app.use(cors())
app.use(express.json())
app.use(expressValidator())
require('dotenv').config()

// connection to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connected to database'))
.catch((err) => console.log('database is not connected : ' + err))

// test app
app.get('/', (req, res) => {
    res.send("welcome to kanban server")
})



app.use('/api/board', boardRouter )
app.use('/api/task', taskRouter )
app.use('/api/user', userRouter )

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`app is now listening at port ${port}`))

module.exports = app;