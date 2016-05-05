import React from 'react'

export default class AddRelatedForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        suggestingRelations: false,
        suggestions: this.filterSuggestions(''),
      }
    }

    relateToCurrentIdea = (targetId) => {
      this.props.relateToCurrentIdea(targetId)
    }

    addRelated = (id) => {
      this.setState({ suggestingRelations: false });
      this.relateToCurrentIdea(id);
      
      // this.refs.addRelated.focus()
      setTimeout(()=>this.refs.addRelated.focus(),10); //#hack
    }


    filterSuggestions = (query) => {
      const {note, allNotes, relatedNotes} = this.props;

      let suggestions = allNotes
        .filter( (currNote) => note && currNote.id !== note.id  && ! (currNote.id in relatedNotes.map( (n) => n.id )) );

      
      const filter = query.toLowerCase();

      if(filter.length > 0) {
        suggestions=suggestions
          .filter( (currNote) => currNote.txt.toLowerCase().indexOf(filter) !== -1)
          .map( (currNote) => {
            const r = new RegExp("("+filter+")","ig")
            return Object.assign({}, currNote, {txt:currNote.txt.replace(r, '<span style="font-weight:bold;background-color: yellow"}>$1</span>')});
          });
      }

      return suggestions

    }

    handleFilterSuggestions = (query) => {

      this.setState({suggestions: this.filterSuggestions(query)})

    }

    createAndRelate = (text) => {
      const newNoteId = this.props.addNote(text);
      this.setState({ suggestingRelations: false });
      this.relateToCurrentIdea(newNoteId);
      this.refs.addRelated.value = "";
      // this.refs.addRelated.focus()
      setTimeout(()=>this.refs.addRelated.focus(),10); //#hack
    }

    render() {

      const {note, allNotes, relatedNotes} = this.props;
      const filterText = this.refs.addRelated ? this.refs.addRelated.value : "";

      return (
        <span style={{position:"relative", margin:"0 40px", }}>
          <span
              style={{width:"120px"}}
              onFocus={ () => this.setState({ suggestingRelations: true }) }
              onBlur={ () => this.setState({ suggestingRelations: false }) }
            >

            <input
              style={{position:"absolute", left:"0px", width:"120px"}}
              type="text"
              placeholder="+ Add Related"
              onChange={ (e) => this.handleFilterSuggestions(e.target.value) }
              ref="addRelated" />

            <ul style={{position:"absolute", left:"0px", top:"20px", padding:"0 3px", zIndex:999, backgroundColor:"white", width:"120px",
              display: (this.state.suggestingRelations ? "block" : "none") }}>

              { this.state.suggestions.map( (suggestion) => {
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
                  onMouseDown={() => this.createAndRelate(filterText)}                
                >
                  {filterText.length>0 ? 
                    <span><span style={{color:"gray"}}>+ add &quot;</span>{filterText}<span style={{color:"gray"}}>&quot; as new idea and relate </span></span>
                    : <span />  }
                </li>
            </ul>

          </span>

            <span style={{ marginLeft: "150px" }}>
              {relatedNotes.map( (note) => 
                <span key={"relatedNote" + note.id} style={{border:"1px solid lightgray", margin: "0 5px", padding: "1px 5px", fontFamily: "Arial, sans serif", fontSize: "12px", color:"maroon"}}>
                  {note.txt}
                </span>)}
            </span>
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
