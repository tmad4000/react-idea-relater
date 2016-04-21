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
                                <Note onEdit={ (value) => this.props.onEdit(note.id, value) } task={note.task} allNotes={this.props.notes}/>
                            </li>
                    )
                }
            </ul>
        )
    }



      //<Note onEdit={this.props.onEdit.bind(undefined,n.id)} task={n.task} />

}
