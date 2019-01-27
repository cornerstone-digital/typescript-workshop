import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStylesProvider from '@vfuk/web-core/components/utilities/GlobalStylesProvider'

const Wrapper = () => {
  return (
    <GlobalStylesProvider>
      <App />
    </GlobalStylesProvider>
  )
}

ReactDOM.render(
    <Wrapper />,
    document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
