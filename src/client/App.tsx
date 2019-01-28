import React, { Component } from 'react'
import IO from 'socket.io-client'
import ChatConnector from './components/ChatConnector'
import {
  Layout, Icon, Row, Button, Drawer
} from 'antd'

import { ICurrentUser } from './types'

const { Content, Header } = Layout

interface IAppState {
  sideBarVisible: boolean,
  members: string[],
  currentUser: ICurrentUser
}

interface IAppProps extends React.HTMLAttributes<HTMLDivElement> { }

const SERVER_URL = 'http://localhost:3000'

class App extends Component<IAppProps, IAppState> {
  public state: IAppState = {
    sideBarVisible: false,
    members: [],
    currentUser: {
      loggedIn: false
    }
  }

  private socket: SocketIOClient.Socket

  constructor (props: IAppProps) {
    super(props)
    this.socket = IO(SERVER_URL)
    this.socket.on('DISCONNECT', () => {
      this.setState({
        currentUser: {
          loggedIn: false
        }
      })
    })
  }

  public componentDidMount () {
    this.socket.on('MEMBERS:UPDATED', (members: string[]) => {
      this.setState({
        members
      })
    })
  }

  public toggleSidebar = () => {
    this.setState({
      sideBarVisible: !this.state.sideBarVisible,
    })
  }

  public handleConnect = (username: FormDataEntryValue) => {
    this.setState({
      currentUser: {
        username: username.toString(),
        loggedIn: true
      }
    })

    this.socket.emit('USER:LOGIN', username)
  }

  public handleLogout = (username: string) => {
    this.setState({
      currentUser: {
        username: undefined,
        loggedIn: false
      }
    })

    this.socket.emit('USER:LOGOUT', username)
  }

  public renderMembers () {
    // console.log(this.state.members)
    return this.state.members.map((username, index) => {
      return (
        <li key={index}>
           {username}
        </li>
      )
    })
  }

  public onClose = () => {
    this.setState({
      sideBarVisible: false
    })
  }

  public render (): JSX.Element {
    return (
      <div className="app">
        <Layout>
          <Layout>
            <Header className="header">
              <div className="trigger">
                <Button type="primary" onClick={this.toggleSidebar}>
                  <Icon
                    type={!this.state.sideBarVisible ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggleSidebar}
                  />
                  Show Member List
                </Button>
              </div>
            </Header>
            <Content className="content">
              <Row type="flex" justify="space-around" align="middle">
                <ChatConnector
                  currentUser={this.state.currentUser}
                  connectHandler={this.handleConnect}
                  logoutHandler={this.handleLogout}
                />
              </Row>
            </Content>
          </Layout>
          <Drawer
            title="Member List"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.sideBarVisible}
          >
            <ul>
              {this.renderMembers()}
            </ul>
          </Drawer>
        </Layout>
      </div>
    )
  }
}

export default App
