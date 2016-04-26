
export const handleTttActions = (state, action) => {
  switch (action.type) {
    case 'PLAY_CELL':

      const newCell = {
        id: action.id,
        tttBoxState: action.turn
      }

      return Object.assign({}, state, )


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
