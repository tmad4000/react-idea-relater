import React from 'react'
import Notes from '../components/Notes.jsx'
import AddRelatedForm from '../components/AddRelatedForm.jsx'
import { addNote, incr, undo } from '../actions'
import { connect } from 'react-redux'

import uuid from 'node-uuid'

class App extends React.Component {

  constructor(props) {
    super(props)
  }


  addNote = (text = "New text") => {
    this.props.dispatch(addNote(text))
  }


  render() {
    const {notes} = this.props;

    return (
      <div>
        <br />


        <button onClick={() => this.props.dispatch(undo())}>undo</button>

        <button onClick={() => this.props.dispatch(incr())}>INCR</button>
        { this.props.counter }
        <button onClick={this.addNote}>+</button>
        <Notes
          addRelation={this.addRelation}
          addNote={this.addNote}
          onEdit={this.editNote}
          notes={notes}
          relations={[]}
        />
      </div>
    )

  }

}

const mapStateToProps = (state) => {
  return {
    notes: state.notesList,
    counter: state.counter,
  }
}


export default connect(mapStateToProps)(App)
