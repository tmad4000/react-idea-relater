import React from 'react'
import Notes from '../components/Notes.jsx'
import AddRelatedForm from '../components/AddRelatedForm.jsx'
import { addNote } from '../actions'
import { connect } from 'react-redux'

import uuid from 'node-uuid'

class App extends React.Component {

  constructor(props) {
    super(props)
  }


  // editNote = (id, value) => {
  //     const notes = this.state.notes.map( (note) => {
  //             if (note.id === id)
  //                 note.text = value
  //             return note
  //         })
  //
  //
  //     this.setState({notes})
  //
  //     //this.setState({
  //     //        notes: newNotes
  //     //    })
  // }

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

  addNote = (text = "New text") => {
    this.props.dispatch(addNote(text))
  }


  render() {
    const {notes} = this.props;

    return (
      <div>
        <br />
        {/*<AddRelatedForm
          note={null}
          relatedNotes={[]}
          relateToCurrentIdea={ (targetId) => this.props.addRelation(id, targetId) }
          allNotes={notes} />*/}

        <button onClick={this.addNote}>+</button>
        <Notes
          addRelation={this.addRelation}
          addNote={this.addNote}
          onEdit={this.editNote}
          notes={notes}
          relations={[]}
        />
        {/*<pkre>{JSON.stringify(this.state.relations, null, '\t')}</pre>*/}
      </div>
    )

  }

}

const mapStateToProps = (state) => {
  return {
    notes: state.notesss
  }
}


export default connect(mapStateToProps)(App)
