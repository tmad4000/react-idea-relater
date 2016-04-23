import { combineReducers } from 'redux'
import {handleNotesActions, handleRelationsActions} from './addOrRelateTodo.js'
import visibilityFilter from './visibilityFilter'


const notesGraph = combineReducers({
  notes:handleNotesActions,
})
//
// const notesGraph = combineReducers({
//   notes:handleNotesActions,
//   relations:handleRelationsActions
// })

export default notesGraph
