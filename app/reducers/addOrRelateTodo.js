
//
// addRelation = (sourceId, targetId) => {
//   if(sourceId === targetId) {
//     console.error("reflexive relation attempt!", sourceId)
//     return false
//   }
//
//   this.setState({
//     relations: this.state.relations.concat(
//       [{
//         id: uuid.v4(),
//         sourceId: sourceId,
//         targetId: targetId,
//         label: ''
//       },
//       {
//         id: uuid.v4(),
//         sourceId: targetId,
//         targetId: sourceId,
//         label: ''
//       }]
//     )
//   })
//
// }
//
//
// const todo = (state, action) => {
//   switch (action.type) {
//     case 'ADD_NOTE':
//       return {
//         id: action.id,
//         text: action.text,
//         completed: false
//       }
//     case 'TOGGLE_TODO':
//       if (state.id !== action.id) {
//         return state
//       }
//
//       return Object.assign({}, state, {
//         completed: !state.completed
//       })
//     default:
//       return state
//   }
// }

export const handleNotesActions = (state = [], action) => {
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

// const handleRelationsActions = (state = [], action) => {
//   switch (action.type) {
//     case 'addRelation':
//       const newNote = {
//         id: action.id,
//         text: action.text,
//         completed: false
//       }
//
//       return [
//         ...state,
//         newNote
//       ]
//
//     default:
//       return state
//   }
// }


// export handleRelationsActions
