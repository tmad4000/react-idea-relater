import React from 'react'
import Notes from '../components/Notes.jsx'
import AddRelatedForm from '../components/AddRelatedForm.jsx'
import { addNote, incr, undo } from '../actions'
import { connect } from 'react-redux'
import TttCell from '../components/TttCell.jsx'
import _ from 'underscore'



import uuid from 'node-uuid'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      counter : 0,
      turn : "X"
    }
  }


  addNote = (text = "New text") => {
    this.props.dispatch(addNote(text))
  }

  nextTurn = () => {
    if (this.state.turn === "X")
      this.setState ({
        turn: "O"
      })
    else
      this.setState ({turn: "X"})
  }

  render() {

    const {notes, tttCells} = this.props;


        // const cells = Object.keys(tttCells).map(
        //   (k) => <TttCell key={k} tttBoxState={tttCells[k]} nextTurn={this.nextTurn} turn={this.state.turn} />
        // )
        //
        //
        // for (let i = 0; i < 3; i++) {
        //
        //   row = cells.splice(0, 3)
        //
        //   for (let j = 0; j < 3; j++) {
        //
        //   }
        //
        // }


    return (
      <div>
        <br />

        <p>Player {this.state.turn}'s turn</p>
        <button onClick={this.nextTurn} >{this.state.turn}</button>
        <br/>



        <div style={{width: "100px", height: "100px"}}>

            {
              tttCells ?
                Object.keys(tttCells).map(
                  (k) => <TttCell key={k} tttBoxState={tttCells[k]} nextTurn={this.nextTurn} turn={this.state.turn} />
                )
                : ''
          }
        </div>

        <br />

        <pre>{JSON.stringify(tttCells, null, '\t')}</pre>



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
    tttCells: state.tttCells,
  }
}


export default connect(mapStateToProps)(App)
