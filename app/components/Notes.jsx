import React from 'react'
import Note from './Note.jsx'

export default class Notes extends React.Component {

    render() {

        return (
            <ul style={{overflow:"scroll",height:"500px"}} >
                {
                    this.props.filteredNotes.map(
                        note =>
                            <li key={note.id} style={{margin:"10px"}}>
                                <Note
                                  onEdit={ (value) => this.props.onEdit(note.id, value) }
                                  note={note}
                                  allNotes={this.props.allNotes}
                                  addRelation={this.props.addRelation}
                                  addNote={this.props.addNote}
                                  rawRelations={this.props.rawRelations}
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
  onEdit: React.PropTypes.func.isRequired,
  addRelation: React.PropTypes.func.isRequired,
  addNote: React.PropTypes.func.isRequired,
  filteredNotes: React.PropTypes.array.isRequired,
  allNotes: React.PropTypes.array.isRequired,
  relations: React.PropTypes.array.isRequired,
  rawRelations: React.PropTypes.bool.isRequired
};
