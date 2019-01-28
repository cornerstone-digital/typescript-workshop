import express, { Application } from 'express'
import { Server } from 'http'
import SocketIO from 'socket.io'
import { MongoClient } from 'mongodb'
// import Mongoose from 'mongoose'

const port: number = 3000
const app: Application = express()
const server: Server = new Server(app)
const io: SocketIO.Server = SocketIO(server)

// Connection URL
const url = 'mongodb://typescript:workshop1@ds159184.mlab.com:59184/typescript-workshop'

// Create a new MongoClient
const client = new MongoClient(url)

let members: string[] = []

const getMembers = () => {
  return [
    'Martin',
    'Lance',
    'Billy',
    'Bla',
    'Someone Else'
  ]
}

client.connect(() => {
  const db = client.db('typescript-workshop')
  app.set('db', db)
  io.on('connection', (socket: SocketIO.Socket): void => {
    const collection = app.get('db').collection('members')
    socket.on('USER:LOGIN', async (username) => {
      // const exists = collection.find({ username })

      // console.log('Exists', exists)

      // if (!exists.length) {
      //   console.log('Not existing')
      //   await collection.insertOne({
      //     username
      //   })
      // } else {
      //   console.log('Already Exists')
      // }

      members.push(username)
      io.emit('USER:CONNECTED', `${username} has connected`)
      io.emit('MEMBERS:UPDATED', getMembers())
    })
  })
})

server.listen(port, (): void => {
  console.log('listening on port 3000')
})
