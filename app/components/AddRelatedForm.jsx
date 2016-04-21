import React from 'react'

export default class AddRelatedForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        suggestingRelations: false,
        filter: ''
      }
    }

    relateToCurrentIdea = (targetId) => {
      this.props.relateToCurrentIdea(targetId)
    }

    addRelated = (id) => {
      this.setState({ suggestingRelations: false });
      this.relateToCurrentIdea(id);
    }

    createAndRelate = (text) => {
      const newNoteId = this.props.addNote(text);
      this.setState({ suggestingRelations: false });
      this.relateToCurrentIdea(newNoteId);
    }

    render() {
      const suggestions = this.props.allNotes
        .filter( (note) => this.props.note && note.id !== this.props.note.id)
        .filter( (note) => note.task.toLowerCase().indexOf(this.state.filter) !== -1);

      const searchText = this.refs.addRelated ? this.refs.addRelated.value : "";

      return (
        <span
            style={{position:"relative", left:"0px"}}
            onFocus={ () => this.setState({ suggestingRelations: true }) }
            onBlur={ () => this.setState({ suggestingRelations: false }) }
          >

          <input
            style={{position:"absolute", left:"0px"}}
            type="text"
            placeholder="+ Add Related"
            onChange={ (e) => this.setState({filter: e.target.value.toLowerCase()})}
            ref="addRelated"
          />

          <ul style={{position:"absolute", left:"0px", top:"20px", zIndex:999, backgroundColor:"white", width:"100px",display: (this.state.suggestingRelations ? "block" : "none") }}>
            { suggestions.map( (suggestion) => {
                return <li
                    className="suggestion"
                    onMouseDown={() => this.addRelated(suggestion.id)}
                    key={suggestion.id}
                  >
                    {suggestion.task}
                  </li>
              })}
              <li
                className="suggestion"
                onMouseDown={() => this.createAndRelate(searchText)}
              >
                + "{searchText}" Add as a new idea and relate
              </li>
          </ul>


          <span style={{ marginLeft: "150px"}}>{this.props.relatedNotes.map( (note) => <span style={{border:"1px solid gray", marginRight: "10px"}}>{note.task}</span>)}</span>

        </span>
      );
    }
}

AddRelatedForm.propTypes = {
  allNotes: React.PropTypes.array.isRequired,
  relatedNotes: React.PropTypes.array.isRequired,
  relateToCurrentIdea: React.PropTypes.func.isRequired,
  addNote: React.PropTypes.func.isRequired,
  note: React.PropTypes.object.isRequired
};
