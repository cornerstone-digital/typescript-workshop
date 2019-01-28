import React, { Component, BaseSyntheticEvent } from 'react'
import { Form, Button, Input, Row, Col } from 'antd'
import { ICurrentUser } from '../types'

interface IChatConnectorProps {
  currentUser: ICurrentUser
  connectHandler: (username: FormDataEntryValue) => void
  logoutHandler: (username: string) => void
}

class ChatConnector extends Component<IChatConnectorProps, {}> {
  public handleSubmit = (event: BaseSyntheticEvent): void => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get('name')
    if (name) {
      this.props.connectHandler(name)
    }
  }

  public handleLogout = (event: BaseSyntheticEvent): void => {
    event.preventDefault()
    if (this.props.currentUser.username) {
      this.props.logoutHandler(this.props.currentUser.username)
    }
  }

  public render (): JSX.Element {
    if (!this.props.currentUser.loggedIn) {
      return (
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <h2>Join the chat room</h2>
          <Form.Item>
            <Input id="name" name="name" type="text" placeholder="Username" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Join</Button>
          </Form.Item>
        </Form>
      )
    }

    return (
      <Form layout="inline" onSubmit={this.handleLogout}>
        <Row type="flex" justify="space-around" align="middle" gutter={10}>
          <Col><p>Logged in as {this.props.currentUser.username}</p></Col>
          <Col><Button type="primary" htmlType="submit">Logout</Button></Col>
        </Row>
      </Form>
    )
  }
}

export default ChatConnector
