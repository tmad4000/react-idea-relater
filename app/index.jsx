require('./main.css');

import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App.jsx'


import {Provider} from 'react-redux'
import {createStore} from 'redux'

import mainReducerApp from './reducers'

import uuid from 'node-uuid'

const initialState = {

              tttCells : {
                [uuid.v4()]: "Z",
                [uuid.v4()]: "Z",
                [uuid.v4()]: "Z",

                [uuid.v4()]: "Z",
                [uuid.v4()]: "Z",
                [uuid.v4()]: "Z",

                [uuid.v4()]: "Z",
                [uuid.v4()]: "Z",
                [uuid.v4()]: "Z",
              },


               notesList : [
                {
                  id: uuid.v4(),
                  text: 'Learn Webpack'
                },
                {
                  id: uuid.v4(),
                  text: 'Learn React'
                },
                {
                  id: uuid.v4(),
                  text: 'Do laundry'
                }
              ],
              counter:15,
              stateStack: [],
            }

let store = createStore(mainReducerApp, initialState)

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
