
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
//     case 'ADD_TODO':
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

const handleNotesActions = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      const newNote = {
        id: action.id,
        text: "New task",
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



export handleNotesActions
// export handleRelationsActions
