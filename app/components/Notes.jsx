import React from 'react'
import Note from './Note.jsx'

export default class Notes extends React.Component {

    render() {
        return (
            <ul style={{overflow:"scroll"}} >
                {
                    this.props.filteredNotes.slice().reverse().map(
                        note => {
                           return <Note
                                  editNote={this.props.editNote}
                                  note={note}
                                  stateData={this.state}
                                  allNotes={this.props.allNotes}
                                  isHidden={!this.props.expandedRelatedIdeas[note.id]}
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
                    })
                }
            </ul>
        )
    }



      //<Note onEdit={this.props.onEdit.bind(undefined,n.id)} txt={n.txt} />

}


Notes.propTypes = {
  editNote: React.PropTypes.func.isRequired,
  addRelation: React.PropTypes.func.isRequired,
  addNote: React.PropTypes.func.isRequired,
  filteredNotes: React.PropTypes.array.isRequired,
  expandedRelatedIdeas: React.PropTypes.object.isRequired,
  allNotes: React.PropTypes.array.isRequired,
  relations: React.PropTypes.array.isRequired,
  rawRelations: React.PropTypes.bool.isRequired
};
