import { combineReducers } from 'redux'
import {handleNotesActions} from './addOrRelateTodo.js'


const notesGraph = combineReducers({
  notesss:handleNotesActions,
})
//
// const notesGraph = combineReducers({
//   notes:handleNotesActions,
//   relations:handleRelationsActions
// })

export default notesGraph
