import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import {AppFromStore} from './containers/App'
import {getStore} from './state/store'
import {Provider} from 'react-redux'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

ReactDOM.render(
  <Provider store={getStore()}>
    <DragDropContextProvider backend={HTML5Backend}>
      <AppFromStore/>
    </DragDropContextProvider>
  </Provider>,
  document.getElementById('root'))

registerServiceWorker()
