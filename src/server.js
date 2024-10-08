const express = require('express')
const cors = require('cors')
const path = require('path')
const { config } = require('dotenv')
const client = require('./db')
const router = require('./routes/index')

client.connect()
config()
const PORT = process.env.PORT || 8080
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, './uploads/userImg')))
app.use(express.static(path.resolve(__dirname, './uploads/e_books_img')))
app.use(express.static(path.resolve(__dirname, './uploads/book_img')))
app.use('/api', router)

const start = async () => {
  try {
    app.listen(PORT, () => console.log('Server started on port: ' + PORT))
  } catch (error) {
    console.log(error)
  }
}

start()