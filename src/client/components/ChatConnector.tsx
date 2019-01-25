import React, { Component, SyntheticEvent } from 'react'
import IO from 'socket.io-client'

interface IChatConnectorProps {
  name: string
}

interface IChatConnectorState {
  profile?: {
    name?: string,
    loggedIn?: false
  },
  connected?: boolean
}

const SERVER_URL = 'http://localhost:3000'

class ChatConnector extends Component<IChatConnectorProps, IChatConnectorState> {
  public state: IChatConnectorState
  private socket: SocketIOClient.Socket

  constructor (props: IChatConnectorProps) {
    super(props)
    this.state = {
      profile: {
        name: this.props.name,
        loggedIn: false
      },
      connected: false
    }

    this.socket = IO(SERVER_URL)
    this.socket.on('connected', () => {
      this.setState({ connected: true })
    })
  }

  public handleLogin = (event: SyntheticEvent): void => {
    event.preventDefault()
    console.log(event)
    // this.socket.emit('USER:LOGIN', this.state.profile)
    // this.setState({
    //   profile: {
    //     name: this.
    //     loggedIn: true
    //   }
    //   connected: false
    // })
    // this.setState({
    //   ...this.state,
    //   profile: {
    //     loggedIn: true
    //   }
    // })
  }

  public render (): JSX.Element {
    if (!this.state.connected) {
      return (
        <form onSubmit={this.handleLogin}>
          <input id="name" name="name" type="text" />
          <button>Login</button>
        </form>
      )
    }

    return (
      <h1>Connected</h1>
    )
  }
}

export default ChatConnector
