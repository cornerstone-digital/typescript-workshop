import express, { Application, NextFunction, Request, Response, Router } from 'express'
import { Server } from 'http'
import SocketIO from 'socket.io'

const port: number = 3000
const app: Application = express()
const server: Server = new Server(app)
const io: SocketIO.Server = SocketIO(server)

let members: string[] = []

io.on('connection', (socket: SocketIO.Socket): void => {
  socket.on('USER:LOGIN', (username) => {
    members = members.filter((member) => {
      return member !== username
    })

    members.push(username)

    io.emit('USER:CONNECTED', `${username} has connected`)
    io.emit('MEMBERS:UPDATED', members)
  })
})

server.listen(port, (): void => {
  console.log('listening on port 3000')
})
