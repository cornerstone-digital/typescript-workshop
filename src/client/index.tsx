import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'

// console.log(styles)

const Wrapper = () => {
  return (
    <App className="app" />
  )
}

ReactDOM.render(
    <Wrapper />,
    document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
