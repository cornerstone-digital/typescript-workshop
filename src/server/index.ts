import express, { Application, NextFunction, Request, Response, Router } from 'express'
import { Server } from 'http'
import SocketIO from 'socket.io'

const port: number = 3000
const app: Application = express()
const server: Server = new Server(app)
const io: SocketIO.Server = SocketIO(server)

let userCount: number = 0

io.on('connection', (socket: SocketIO.Socket): void => {
  socket.on('USER:LOGIN', (message) => {
    userCount++
    io.emit('USER:CONNECTED', `${message.name} has connected`)
    console.log(`${message.name} has connected`)
  })
})

server.listen(port, (): void => {
  console.log('listening on port 3000')
})
