import React from 'react'

export default class AddRelatedForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        suggestingRelations: false
      }
    }

    render() {
      const suggestions = this.props.allNotes;

      return (
        <span>
          <input type="text"
            placeholder="+ Add Related"
            onFocus={ () => this.setState({ suggestingRelations: true }) }
            onBlur={ () => this.setState({ suggestingRelations: false }) }
          />

          <ul style={{backgroundColor:"white", width:"100px",display: (this.state.suggestingRelations ? "block" : "none") }}>
            { suggestions.map( (suggestion) => {
                return <li>{suggestion.task}</li>
              })
            }
          </ul>
        </span>
      );
    }
}

AddRelatedForm.propTypes = {
  allNotes: React.PropTypes.array.isRequired
};
