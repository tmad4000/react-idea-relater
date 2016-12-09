import React from 'react'
import Note from './Note.jsx'

export default class Notes extends React.Component {

    render() {
        console.log(this.props.filteredNotes)

        return (
            <ul style={{overflow:"scroll"}} >
                {
                    this.props.filteredNotes.slice().reverse().map(
                        note =>
                            <li key={note.id} style={{margin:"10px"}}>
                                <Note
                                  editNote={this.props.editNote}
                                  nodeState={this.props.parentNodeState.getChildState(note.id)}
                                  note={note}
                                  allNotes={this.props.allNotes}
                                  addRelation={this.props.addRelation}
                                  addNote={this.props.addNote}
                                  rawRelations={this.props.rawRelations}
                                  relations={this.props.relations}
                                  relatedNotes={
                                    this.props.relations.filter(
                                      (relation) => note.id === relation.sourceId
                                    )
                                    .map((relation) => {
                                      return {
                                        broken: relation.broken,
                                        note: !relation.broken ? this.props.allNotes.find((n) => n.id === relation.targetId) : undefined,
                                        relation
                                      }
                                    })
                                  }

                                  />
                            </li>
                    )
                }
            </ul>
        )
    }



      //<Note onEdit={this.props.onEdit.bind(undefined,n.id)} txt={n.txt} />

}


Notes.propTypes = {
  editNote: React.PropTypes.func.isRequired,
  parentNodeState: React.PropTypes.isRequired,
  addRelation: React.PropTypes.func.isRequired,
  addNote: React.PropTypes.func.isRequired,
  filteredNotes: React.PropTypes.array.isRequired,
  allNotes: React.PropTypes.array.isRequired,
  relations: React.PropTypes.array.isRequired,
  rawRelations: React.PropTypes.bool.isRequired
};
