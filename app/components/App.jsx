import React from 'react'
import Notes from './Notes.jsx'
import uuid from 'node-uuid'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state={

       notes : [
        {
          id: uuid.v4(),
          task: 'Learn Webpack'
        },
        {
          id: uuid.v4(),
          task: 'Learn React'
        },
        {
          id: uuid.v4(),
          task: 'Do laundry'
        }
      ],

    }
  }

  render() {
    const notes = this.state.notes;


    return (
      <div>
        <br />
        <button onClick={this.addNote}>+</button>
        <Notes onEdit={this.editNote} notes={notes} />

      </div>
    )

  }


  editNote = (id, value) => {
      const notes = this.state.notes.map( (note) => {
              if (note.id === id)
                  note.task = value
              return note
          })


      this.setState({notes})

      //this.setState({
      //        notes: newNotes
      //    })
  }



  addNote = () => {
    this.setState({
      notes: this.state.notes.concat(
        [
          {
            id: uuid.v4(),
            task: "New task"
          }
        ])
    });
  }
}
