import React from 'react'
import Notes from './Notes.jsx'
import uuid from 'node-uuid'

import { encodeHtmlEntity, filterEntries } from './utils.js'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state={
             filter: '',


             notes : [
              {
                id: '0',
                txt: 'Learn Webpack <b> dfdf </b>',
                userInputText: 'Learn Webpack <b> dfdf </b>'
              },
              {
                id: '1',
                txt: 'Learn React',
                userInputText: 'Learn React'
              },
              {
                id: '2',
                txt: 'Do laundry',
                userInputText: 'Do laundry'
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

  // parseNotesFromText = (txt) => {
  //   return txt.split("\n\n").map( (noteTxt, i) => {
  //     return {
  //       id: ''+ i,
  //       txt: noteTxt
  //     }
  //   })
  // }
  //
  parseNotesFromText = (txt) => {
    const {notes, relations} = txt.split("\n\n")
      .map(this.parseOneNoteFromText)
      .reduce((aggregate, {notes,relations}) => ({
        notes: aggregate.notes.concat(notes),
        relations: aggregate.relations.concat(relations)
      }), {notes: [], relations: []})
    this.setState({notes, relations});
  }

  parseOneNoteFromText = (noteTxt,i) => {
    let relations = noteTxt.split("<>")
    const noteText = relations.shift()

    if (relations.length > 0) {
      relations = relations
        .map((relation) => relation.trim())
        .map((relation,j) => {
          const targetIdea = this.state.notes
            .find(note => note.id != i && note.txt.toLowerCase().indexOf(relation.toLowerCase()) != -1)
          return [{
            id: i + '-'+ (2*j),
            mirrorRelationId: i + '-'+ (2*j+1),
            userInputText: relation,
            sourceId: i + '',
            targetId: targetIdea ? targetIdea.id : null,
            broken: targetIdea ? false : true,
          }, {
            id: i + '-' + (2*j+1),
            mirrorRelationId: i + '-'+ (2*j),
            userInputText: relation,
            sourceId: targetIdea ? targetIdea.id : null,
            targetId: i + '',
            broken: targetIdea ? false : true,
          }];
        })
        .reduce((array, subArray) => array.concat(subArray), [])

      this.setState({
        relations: relations,
      })
    }
    const note = {
      id: i + '',
      txt: noteText,
      userInputText: noteTxt,
    }

    return {
      notes: [note],
      relations,
    }
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


        <div>
          <label htmlFor="tags">Search Tags/Keywords:<br />
          </label>

  <input
              type="text"
              placeholder="Search Tags/Keywords: "
            onChange={ (e) => this.setState({filter: e.target.value})}
            ref="filter" tabIndex="2" size="150" />



  <button id="clear">Clear</button>
</div>
        <br />
        <br />




        <button onClick={() => this.addNote()}>+</button>

        <Notes
          addRelation={this.addRelation}
          addNote={this.addNote}
          onEdit={this.editNote}
          allNotes={this.state.notes}
          filteredNotes={filterEntries(this.state.notes, this.state.filter)}
          relations={relations}
        />

        <br />
        <br />

        To export letterspace docs:
        <pre>
          cd /Users/jacob/Library/Containers/com.x10studio.LetterspaceMac/Data/Documents/Home
          cat $(ls -t) > allLetterSpaceNotes.backup.txt
        </pre>
        {/*<pre>
          {JSON.stringify(this.state.relations,null,'\t')}
        </pre>*/}


        <textarea
          cols="150"
          rows="10"
          tabIndex="1"
          onChange={ (e) => this.parseNotesFromText(e.target.value) }
          value = { this.state.notes.map( (note) => note.userInputText).join("\n\n") }
        />
{/*
        <div
          contentEditable
          style={{width:'100%', height: '300px', backgroundColor: 'white', border: '1px solid black'}}
          tabIndex="1"
          onChange={ (e) => this.parseNotesFromText(e.target.value) }
          value = { this.state.notes.map( (note) => note.userInputText).join("\n\n") }
        />*/}

      </div>
    )

  }

}
