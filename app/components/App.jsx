import React from 'react'
import Notes from './Notes.jsx'
import AddRelatedForm from './AddRelatedForm.jsx'
import uuid from 'node-uuid'

export default class App extends React.Component {

  constructor(props) {
    super(props)
  }


  // editNote = (id, value) => {
  //     const notes = this.state.notes.map( (note) => {
  //             if (note.id === id)
  //                 note.task = value
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

  addNote = (text = "New task") => {
    const id = uuid.v4();
    this.setState({
      notes: this.state.notes.concat(
        [
          {
            id,
            task: text
          }
        ])
    });

    return id;
  }


  render() {
    const {notes, relations} = this.state;

    return (
      <div>
        <br />
        {/*<AddRelatedForm
          note={null}
          relatedNotes={[]}
          relateToCurrentIdea={ (targetId) => this.props.addRelation(id, targetId) }
          allNotes={notes} />*/}

        <button onClick={() => this.addNote()}>+</button>
        <Notes
          addRelation={this.addRelation}
          addNote={this.addNote}
          onEdit={this.editNote}
          notes={notes}
          relations={relations}
        />
        {/*<pre>{JSON.stringify(this.state.relations, null, '\t')}</pre>*/}
      </div>
    )

  }

}
