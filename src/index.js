const express = require ('express')
const cors = require('cors')
const path = require('path')

const photoRouter = require('./routers/flickrRouter')
const publicDirectoryPath = path.join(__dirname, '../public')
require('./db/mongoose');

const port = process.env.PORT
const app = express()

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(cors())
app.use(photoRouter)

app.listen(port, () => {
    console.log('Server connected, port:', port)
})
