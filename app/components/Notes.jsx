import React from 'react'
import Note from './Note.jsx'

export default class Notes extends React.Component {

    render() {

        return (
            <ul>
                {
                    this.props.notes.map(
                        note =>
                            <li key={note.id}>
                                <Note
                                  onEdit={ (value) => this.props.onEdit(note.id, value) }
                                  note={note}
                                  allNotes={this.props.notes}
                                  addRelation={this.props.addRelation}
                                  relatedNotes={
                                    this.props.relations.filter(
                                      (relation) => note.id === relation.sourceId
                                    )
                                    .map( (relation) => this.props.notes.find( (n) => n.id === relation.targetId ))
                                  }

                                  />
                            </li>
                    )
                }
            </ul>
        )
    }



      //<Note onEdit={this.props.onEdit.bind(undefined,n.id)} task={n.task} />

}


Notes.propTypes = {
  onEdit: React.PropTypes.func.isRequired,
  addRelation: React.PropTypes.func.isRequired,
  notes: React.PropTypes.array.isRequired,
  relations: React.PropTypes.array.isRequired
};
