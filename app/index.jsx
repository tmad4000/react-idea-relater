require('./main.css');

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import notesGraphApp from './reducers'

import uuid from 'node-uuid'

const initialState = {
               notes : [
                {
                  id: uuid.v4(),
                  task: 'Learn Webpack'
                },
                {
                  id: uuid.v4(),
                  task: 'Learn React'
                },
                {
                  id: uuid.v4(),
                  task: 'Do laundry'
                }
              ],
              relations : [

              ]
}

let store = createStore(notesGraphApp, initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

{/*var comp=require('./component')
var app=document.createElement('div')

document.body.appendChild(app)

app.appendChild(comp())*/}
