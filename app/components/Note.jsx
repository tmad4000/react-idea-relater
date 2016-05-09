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

    if (this.props.onEdit) {
      this.props.onEdit(value);
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
      todoDiv = <span onClick={this.edit} dangerouslySetInnerHTML= {{__html:htmlTxt}}>

      </span>
    }
    else {
      todoDiv = <input type="text"
        ref = {
          (e) => e ? e.selectionStart = txt.length : null
        }
        autoFocus={true}
        onBlur={this.finishEdit}
        onKeyPress={this.checkEnter}
        defaultValue={txt} />;
    }

  return <div>
    {todoDiv}
    <AddRelatedForm
      note={this.props.note}
      relatedNotes={this.props.relatedNotes}
      relateToCurrentIdea={ (targetId) => this.props.addRelation(id, targetId) }
      addNote={this.props.addNote}
      allNotes={this.props.allNotes}
    />
    </div>
  }
}

Note.propTypes = {
  onEdit: React.PropTypes.func.isRequired,
  allNotes: React.PropTypes.array.isRequired,
  addRelation: React.PropTypes.func.isRequired,
  addNote: React.PropTypes.func.isRequired,
};
