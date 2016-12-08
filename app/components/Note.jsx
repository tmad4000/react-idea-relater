import React from 'react'
import AddRelatedForm from './AddRelatedForm'

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }


  edit = (e) => {
    this.setState({editing:true});
  }

  finishEdit = (e) => {
    const {value} = e.target;

    if (this.props.editNote) {
      this.props.editNote(this.props.note.id, value);
      this.setState({editing: false});
    }

  }

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
      this.finishEdit(e);
    }
  }


  render() {
    const {id, txt, htmlTxt} = this.props.note

    let todoDiv;
    if(!this.state.editing) {
      todoDiv = <span onClick={this.edit} dangerouslySetInnerHTML= {{__html:txt}}></span>
      // todoDiv = <span onClick={this.edit} dangerouslySetInnerHTML= {{__html:htmlTxt}}></span>

    }
    else {
      todoDiv = <input type="text"
        ref = { ()=>{} /*
          (e) => e ? e.selectionStart = txt.length : null
        */}

        autoFocus={true}
        onBlur={this.finishEdit}
        onKeyPress={this.checkEnter}
        onChange={(e) => this.props.editNote(this.props.note.id, e.target.value)}
        defaultValue={txt} />;
    }

  return <div>
    {todoDiv}
    <AddRelatedForm
      note={this.props.note}
      rawRelations={this.props.rawRelations}
      relatedNotes={this.props.relatedNotes}
      relateToCurrentIdea={ (targetId) => this.props.addRelation(id, targetId) }
      addNote={this.props.addNote}
      allNotes={this.props.allNotes}

      addRelation={this.props.addRelation}
      editNote={this.props.editNote}
      relations={this.props.relations}
    />
    </div>
  }
}

Note.propTypes = {

  note: React.PropTypes.object.isRequired,
  rawRelations: React.PropTypes.bool.isRequired,
  relatedNotes: React.PropTypes.array.isRequired,
  editNote: React.PropTypes.func.isRequired,
  allNotes: React.PropTypes.array.isRequired,
  addRelation: React.PropTypes.func.isRequired,
  addNote: React.PropTypes.func.isRequired,
};
