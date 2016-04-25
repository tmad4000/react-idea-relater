
export const handleNotesActions = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      const newNote = {
        id: action.id,
        text: "New text",
      }

      return [
        ...state,
        newNote
      ]

    default:
      return state
  }

}

export const handleCounter = (state, action) => {
  switch (action.type) {
    case 'INCR':
      return state + 1

    default:
      return state
  }

}

export const undoReducer = (state, action) => {
  switch (action.type) {
    case 'UNDO':
      return state.stateStack.slice(-1).pop()

    default:
      return Object.assign({}, state, {
        stateStack: state.stateStack.concat([state])
      })
  }

}
