import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { App } from './containers/App'
import { UserProvider } from './context/user-context'
import { getStore } from './state/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={getStore()}>
    <UserProvider>
      <App />
    </UserProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
