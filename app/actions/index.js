import uuid from 'node-uuid'


export const addNote = (text) => {
  return {
    type: 'ADD_NOTE',
    id: uuid.v4(),
    text
  }
}
