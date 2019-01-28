import express, { Application } from 'express'
import { Server } from 'http'
import SocketIO from 'socket.io'
import { MongoClient } from 'mongodb'

const port: number = 3000
const app: Application = express()
const server: Server = new Server(app)
const io: SocketIO.Server = SocketIO(server)

// Connection URL
const url = 'mongodb://typescript:workshop1@ds159184.mlab.com:59184/typescript-workshop'

// Create a new MongoClient
const client = new MongoClient(url)

let members: string[] = []

client.connect(() => {
  const db = client.db('typescript-workshop')
  app.set('db', db)
})

io.on('connection', (socket: SocketIO.Socket): void => {
  const collection = app.get('db').collection('members')
  socket.on('USER:LOGIN', (username) => {
    const memberList = collection.find({ username })
    console.log(memberList)

    members.push(username)
    io.emit('USER:CONNECTED', `${username} has connected`)
    io.emit('MEMBERS:UPDATED', members)
  })
})

server.listen(port, (): void => {
  console.log('listening on port 3000')
})
