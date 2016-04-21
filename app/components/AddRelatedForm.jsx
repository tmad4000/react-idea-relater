import React from 'react'

export default class AddRelatedForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        suggestingRelations: false,
        filter: ''
      }
    }

    relateToRootIdea = (targetId) => {
      this.props.relateToRootIdea(targetId)
    }

    render() {
      const suggestions = this.props.allNotes.filter( (note) => note.id !== this.props.note.id)
      .filter( (note) => note.task.toLowerCase().indexOf(this.state.filter) !== -1);

      return (
        <span
            style={{position:"relative", left:"0px"}}
            onFocus={ () => this.setState({ suggestingRelations: true }) }
          >
          {/*onBlur={ () => this.setState({ suggestingRelations: false }) }*/}

          <input
          style={{position:"absolute", left:"0px"}}
          type="text"
          placeholder="+ Add Related"
          onChange={ (e) => this.setState({filter: e.target.value.toLowerCase()})}
          />

          <ul style={{position:"absolute", left:"0px", top:"20px", zIndex:999, backgroundColor:"white", width:"100px",display: (this.state.suggestingRelations ? "block" : "none") }}>
            { suggestions.map( (suggestion) => {
                return <li
                      className="suggestion"
                      onClick={() => {
                        console.log("click")
                        this.setState({ suggestingRelations: false }) //#hack

                        this.relateToRootIdea(suggestion.id)
                      }
                    }
                      key={suggestion.id}>
                    {suggestion.task}
                  </li>
              })
            }
          </ul>


          <span style={{ marginLeft: "150px"}}>{this.props.relatedNotes.map( (note) => <span style={{border:"1px solid gray", marginRight: "10px"}}>{note.task}</span>)}</span>

        </span>
      );
    }
}

AddRelatedForm.propTypes = {
  allNotes: React.PropTypes.array.isRequired,
  relatedNotes: React.PropTypes.array.isRequired,
  relateToRootIdea: React.PropTypes.func.isRequired,
  note: React.PropTypes.object.isRequired
};
