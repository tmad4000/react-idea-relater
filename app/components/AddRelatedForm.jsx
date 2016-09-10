import React from 'react'
import { encodeHtmlEntity, filterEntries } from './utils.js'


export default class AddRelatedForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        suggestingRelations: false,
        filter:''
      }
    }

    relateToCurrentIdea = (target) => {
      this.props.relateToCurrentIdea(target)
    }

    addRelated = (id) => {
      this.setState({ suggestingRelations: false });
      this.relateToCurrentIdea(id);

      // this.refs.addRelated.focus()
      setTimeout(()=>this.refs.addRelated.focus(),10); //#hack
    }


    //#question should i make this a pure function of props?
    filteredSuggestions = () => {
      if(!this.state.suggestingRelations) return [];

      const {note, allNotes, relatedNotes} = this.props;


      let suggestions = allNotes.filter( (currNote) =>
        true
          && note
          && currNote.id !== note.id
          && !relatedNotes.find(n => n.id === currNote.id)
      )

      suggestions = filterEntries(suggestions, this.state.filter)

      return suggestions

    }



    createAndRelate = (text) => {
      const newNoteId = this.props.addNote(text);
      this.addRelated(newNoteId)

      this.setState({filter:''})
    }

    renderRaw() {
      const { relatedNotes } = this.props;
      return <span style={{ marginLeft: "150px", lineHeight:"21px" }}>
        {relatedNotes.map( ({broken, note, relation}) =>
          <span key={"relatedNote" + relation.id} style={{border:"1px solid lightgray", margin: "0 5px", padding: "1px 5px", fontFamily: "Arial, sans serif", fontSize: "12px", color:"maroon"}}>
            {"<>"} {relation.userInputText}
          </span>)}
      </span>
    }

    render() {
      if(this.props.rawRelations == true) return this.renderRaw();
      const {note, allNotes, relatedNotes} = this.props;

      return (
        <span style={{position:"relative", margin:"0 40px", }}>

          {/* add related input and dropdown */ }
          <span
              style={{width:"120px"}}
              onFocus={ () => this.setState({ suggestingRelations: true }) }
              onBlur={ () => this.setState({ suggestingRelations: false }) }
            >

            {/* add related input */ }
            <input
              style={{position:"absolute", left:"0px", width:"120px"}}
              type="text"
              placeholder="+ Add Related"
              onChange={ (e) => this.setState({filter:e.target.value}) }
              value={this.state.filter}
              ref="addRelated" />

            {/* add relations dropdown*/ }
            <ul style={{position:"absolute", left:"0px", top:"20px", padding:"0 3px", zIndex:999, backgroundColor:"white", width:"120px",
              display: (this.state.suggestingRelations ? "block" : "none") }}>
              { this.filteredSuggestions()
                .map( (suggestion) => {
                  return <li
                      className="suggestion"
                      onMouseDown={() => this.addRelated(suggestion.id)}
                      key={suggestion.id}
                      dangerouslySetInnerHTML= {{__html:suggestion.txt}}
                    >
                  { /* #hack */}

                    </li>
                })}
                <li
                  className="suggestion"
                  onMouseDown={() => this.createAndRelate(this.state.filter)}
                >
                  {this.state.filter.length>0 ?
                    <span><span style={{color:"gray"}}>+ add &quot;</span>{this.state.filter}<span style={{color:"gray"}}>&quot; as new idea and relate </span></span>
                    : ''  }
                </li>
            </ul>

          </span>

          {/* output related notes list */ }
          <span style={{ marginLeft: "150px", lineHeight:"21px" }}>
            {relatedNotes.map( ({broken, note, relation}) =>
              <span key={"relatedNote" + relation.id} style={{border:"1px solid lightgray", margin: "0 5px", padding: "1px 5px", fontFamily: "Arial, sans serif", fontSize: "12px", color:"maroon"}}>
                {!broken ? note.txt : 'broken: ' + relation.userInputText}
              </span>)}
          </span>
        </span>

      );
    }
}

AddRelatedForm.propTypes = {
  allNotes: React.PropTypes.array.isRequired,
  rawRelations: React.PropTypes.bool.isRequired,
  relatedNotes: React.PropTypes.array.isRequired,
  relateToCurrentIdea: React.PropTypes.func.isRequired,
  addNote: React.PropTypes.func.isRequired,
  note: React.PropTypes.object.isRequired
};
