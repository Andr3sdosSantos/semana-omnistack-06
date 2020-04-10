import express from 'express'
import mongoose from 'mongoose'
import { resolve } from 'path'
import cors from 'cors'

import routes from './routes'

app.use(cors())

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box)
  })
})

mongoose.connect('mongodb+srv://week-06:omnistack@cluster0-hhjrt.mongodb.net/week-6?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use((req, res, next) => {
  req.io = io
  return next()
})


app.use(express.json())
app.use(routes)
app.use(express.urlencoded({ extended: true })) // Permite envio de arquivos
app.use('/files', express.static(resolve(__dirname, '..', 'tmp')))

server.listen(process.env.PORT || 3333)
