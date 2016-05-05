import React from 'react'
import Notes from './Notes.jsx'
import AddRelatedForm from './AddRelatedForm.jsx'
import uuid from 'node-uuid'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state={
             filter: '',


             notes : [
              {
                id: uuid.v4(),
                txt: 'Learn Webpack'
              },
              {
                id: uuid.v4(),
                txt: 'Learn React'
              },
              {
                id: uuid.v4(),
                txt: 'Do laundry'
              }
            ],
            relations : [

            ]
    }

    // relation:
    // {
    //   id: uuid.v4(),
    //   sourceId: uuid.v4(),
    //   targetId: uuid.v4(),
    //   label: 'Learn Webpack'
    // }

  }


  editNote = (id, value) => {
      const notes = this.state.notes.map( (note) => {
              if (note.id === id)
                  note.txt = value
              return note
          })


      this.setState({notes})

      //this.setState({
      //        notes: newNotes
      //    })
  }

  addRelation = (sourceId, targetId) => {
    if(sourceId === targetId) {
      console.error("reflexive relation attempt!", sourceId)
      return false
    }    

    if( this.state.relations.filter( (rel) => rel.sourceId === sourceId && rel.targetId === targetId ).length > 0 ) {
      console.error("relation already exists!", sourceId, targetId)
      return false
    }


    this.setState({
      relations: this.state.relations.concat(
        [{
          id: uuid.v4(),
          sourceId: sourceId,
          targetId: targetId,
          label: ''
        },
        {
          id: uuid.v4(),
          sourceId: targetId,
          targetId: sourceId,
          label: ''
        }]
      )
    })

  }

  addNote = (text = "New txt") => {
    const id = uuid.v4();
    this.setState({
      notes: this.state.notes.concat(
        [
          {
            id,
            txt: text
          }
        ])
    });

    return id;
  }


  render() {
    const {notes, relations} = this.state;

    // const suggestions = this.props.allNotes
    //     .filter( (note) => this.props.note && note.id !== this.props.note.id)
    //     .filter( (note) => note.txt.toLowerCase().indexOf(this.state.filter) !== -1);

    const searchText = this.refs.filter ? this.refs.filter.value : "";


    return (
      <div>
        <br />
        {/*<AddRelatedForm
          note={null}
          relatedNotes={[]}
          relateToCurrentIdea={ (targetId) => this.props.addRelation(id, targetId) }
          allNotes={notes} />*/}

<div>
        <label htmlFor="tags">Search Tags/Keywords: 
        <br />
  </label>
   <input type="text" placeholder="Search Tags/Keywords: "
            onChange={ (e) => this.setState({filter: e.target.value.toLowerCase()})}
            ref="filter" tabIndex="2" size="150" />


  <button id="clear">Clear</button>
        <textarea cols="150" rows="30" id="log" tabIndex="1"></textarea>
</div>
        <br />
        <br />

<div id="tags">
asdf
</div>

<br />
<br />
To export letterspace docs:
  <pre>
    cd /Users/jacob/Library/Containers/com.x10studio.LetterspaceMac/Data/Documents/Home
    cat $(ls -t) > allLetterSpaceNotes.backup.txt
  </pre>


<br />
<br />

        <button onClick={() => this.addNote()}>+</button>

        <Notes
          addRelation={this.addRelation}
          addNote={this.addNote}
          onEdit={this.editNote}
          notes={notes}
          relations={relations}
        />
        <pre>{JSON.stringify(this.state.relations, null, '\t')}</pre>
      </div>
    )

  }

}