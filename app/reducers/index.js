import { combineReducers } from 'redux'
import {handleNotesActions, handleCounter, undoReducer} from './addOrRelateTodo.js'

const ourCombinedReducers = (reducers) => {
  return (state, action) => {

    const newState = {};
    Object.keys(reducers).map(key => {
      newState[key] = reducers[key](
        state[key], action
      )
    })

    return Object.assign({},state,newState)
  }
}

const reducerWithoutUndo = ourCombinedReducers({
  notesList:handleNotesActions,
  counter:handleCounter,
})

const mainReducer = (state, action) => {
  return reducerWithoutUndo(undoReducer(state,action),action);
}

export default mainReducer
