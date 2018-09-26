require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const listener = () => console.log(`Listening to port ${port}!`)

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cors())
app.use(function (err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON');
    }
})  

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true })

const userSchema = new mongoose.Schema({
    user_name: String,
    email: String
})
const Users = mongoose.model('Users', userSchema)

const contentSchema = new mongoose.Schema({
    Sports : Array
})
const Content = mongoose.model('Content', contentSchema)


//read
app.get('/', (req,res) => {
    Content.find({})
        .then(users => res.json({users}))
})

//create
app.post('/', (req, res) => {
    Content.create(req.body)
        .then(newUser => res.status(201).json({newUser}))
})

//update
app.put('/:id', (req, res) => {
    Users.update({_id: req.params.id}, { $set: req.body})
        .then(updatedUser => res.status(201).json({updatedUser}))
})

//delete
app.delete('/:id', (req, res) => {
    Content.deleteOne({_id: req.params.id})
        .then(deletedUser => res.status(201).json({deletedUser}))
})


app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({error:err})
})

app.use((req,res,next)=>{
    res.status(404).json({error: {message: 'Not Found!'}})
})

app.listen(port,listener)