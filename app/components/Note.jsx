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

    let todoDiv;
    if(!this.state.editing) {
      todoDiv = <span onClick={this.edit} >{this.props.task}
       &nbsp;
      </span>
    }
    else {
      todoDiv = <input type="text"
        ref = {
          (e) => e ? e.selectionStart = this.props.task.length : null
        }
        autoFocus={true}
        onBlur={this.finishEdit}
        onKeyPress={this.checkEnter}
        defaultValue={this.props.task} />;
    }

  return <div>{todoDiv} <AddRelatedForm allNotes={this.props.allNotes} /></div>
  }
}

Note.propTypes = {
  onEdit: React.PropTypes.func.isRequired,
  allNotes: React.PropTypes.array.isRequired
};
