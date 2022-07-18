require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const router = require('./routes/index')
const errorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandlingMiddleware)
app.use(express.static(path.resolve(__dirname, 'static')))
const {PORT} = process.env

const start = async() => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {console.log(`App is running on port ${PORT}`)});
    }catch(err){
        console.log(err)
    }
}

start()