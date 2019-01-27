import React, { Component } from 'react'
import ChatConnector from './components/ChatConnector'

class App extends Component<{}, {}> {
  public render (): JSX.Element {
    return (
      <ChatConnector name="Martin" />
    )
  }
}

export default App
