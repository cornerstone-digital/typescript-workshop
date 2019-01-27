import React, { Component, SyntheticEvent } from 'react'
import IO from 'socket.io-client'

interface IChatConnectorProps {
  name: string
}

interface IChatConnectorState {
  profile?: {
    name?: string,
    loggedIn: boolean
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
  }

  public handleLogin = (event: SyntheticEvent): void => {
    event.preventDefault()
    this.socket.emit('USER:LOGIN', this.state.profile)
    this.setState({
      profile: {
        loggedIn: true
      },
      connected: true
    })
  }

  public render (): JSX.Element {
    if (!this.state.connected) {
      return (
        <form onSubmit={this.handleLogin}>
          <input id="name" name="name" type="text" />
          <button>Join</button>
        </form>
      )
    }

    return (
      <h1>Connected</h1>
    )
  }
}

export default ChatConnector
