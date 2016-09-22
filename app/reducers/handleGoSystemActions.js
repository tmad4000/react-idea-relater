const handleCellActions = (state, action) => {
  switch (action.type) {
    case 'PLAY_STONE':
      if (state.id !== action.id) {
        return state
      }

      return action.whoseTurn

    default:
      return state
  }

}

const handleGoSystemActions = (state = {whoseTurn:1, board:[null,null]} , action) => {
  action.whoseTurn=state.whoseTurn

  switch (action.type) {
    case 'PLAY_STONE':
      const newBoard=state.board.map( c => handleCellActions(c, action))
      return {whoseTurn : state.whoseTurn === 1 ? 2 : 1, board:newBoard}





    default:
      return state
  }

}

export default handleGoSystemActions
