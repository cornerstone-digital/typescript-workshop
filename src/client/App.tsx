import React, { Component } from 'react'
// import IO from 'socket.io-client'
import ChatConnector from './components/ChatConnector'

class App extends Component<{}, {}> {
  // public state: IAppState
  // private socket: SocketIOClient.Socket

  // constructor (props: any) {
  //   super(props)
  //   this.socket = IO('http://localhost:3000')
  //   this.socket.on('connected', () => {
  //     console.log('Connected')
  //     this.setState({ loggedIn: true })
  //     this.socket.emit('USER:CONNECTED', 'Hello')
  //   })
  // }

  public render (): JSX.Element {
    return (
      <ChatConnector name="Martin" />
    )
  }
}

export default App
