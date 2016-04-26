import uuid from 'node-uuid'


export const addNote = (text) => {
  return {
    type: 'ADD_NOTE',
    id: uuid.v4(),
    text
  }
}

export const incr = () => {
  return {
    type: 'INCR'
  }
}

export const playCell = (key, turn) => {
  return {
    type: 'PLAY_CELL',
    id: key, 
    turn: turn
  }
}

export const undo = () => {
  return {
    type: 'UNDO'
  }
}
