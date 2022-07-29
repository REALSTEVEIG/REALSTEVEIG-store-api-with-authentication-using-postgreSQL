require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const db = require('./db/connect')
const authRouter = require('./routes/user')
const productRouter = require('./routes/products')
const cookieParser = require('cookie-parser')
const User = require('./model/user')
const Products = require('./model/products')
const authMiddleware = require('./middleware/auth')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


//Linking the users and products model
User.hasMany(Products)

//synchronizing the database and forcing it to false so we dont lose data
db.sync({ force: false }).then(() => {
    console.log("database is synced")
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/products', authMiddleware ,productRouter)

const start = async () => {
    try {
        await db.authenticate();
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
