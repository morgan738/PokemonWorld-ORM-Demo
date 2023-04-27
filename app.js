const express = require('express')
const morgan = require('morgan')
const {Pokemon, Trainer} = require('./db')
const app = express()
const pokemonRouter = require('./api/pokemon')
const router = require("./api/index")



app.use(morgan('tiny'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// app.use('/pokemon', pokemonRouter)
// app.use('/trainer', require('./api/trainer'))
app.use(router)

app.get('/', (req,res,next) => {
    res.send("Hello! Homepage")
})

app.use((err,req,res,next) => {
  res.status(404).send(err)
})



const PORT = 1337
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}...`)
})