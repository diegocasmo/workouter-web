import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import {App} from './containers/App'
import {UserProvider} from './context/user-context'
import {getStore} from './state/store'
import {Provider} from 'react-redux'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

ReactDOM.render(
  <Provider store={getStore()}>
    <DragDropContextProvider backend={HTML5Backend}>
      <UserProvider>
        <App/>
      </UserProvider>
    </DragDropContextProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
