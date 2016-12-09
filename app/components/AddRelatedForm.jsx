import React from 'react'
import { encodeHtmlEntity, filterEntries } from './utils.js'
import Notes from './Notes'


export default class AddRelatedForm extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        suggestingRelations: false,
        filter: '',
        expandedRelatedIdeas: this._getExpandedIdeasFromNodeState()
      }
    }

    _getExpandedIdeasFromNodeState = () => {
      if (!this.props.nodeState.expandedRelatedIdeas) {
        this.props.nodeState.expandedRelatedIdeas = {}
      }

      return Object.assign({}, this.props.nodeState.expandedRelatedIdeas)
    }

    _setExpandedIdeasToNodeState = (newExpandedIdeas) => {
      this.props.nodeState.expandedRelatedIdeas = newExpandedIdeas
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

    toggleRelatedNoteDisplay = (relation) => {
      const expandedRelatedIdeas = this._getExpandedIdeasFromNodeState()
      const relatedNoteId = relation.targetId
      const currentRelatedIdeaExpansionState = expandedRelatedIdeas[relatedNoteId]
      const toggledExpansionState = currentRelatedIdeaExpansionState ? undefined : true

      expandedRelatedIdeas[relatedNoteId] = toggledExpansionState

      this._setExpandedIdeasToNodeState(expandedRelatedIdeas)

      this.setState({
        expandedRelatedIdeas: expandedRelatedIdeas
      })
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
              <span key={"relatedNote" + relation.id}
                  onClick={() => this.toggleRelatedNoteDisplay(relation)}
                  style={
                    Object.assign(
                    {margin: "0 5px", padding: "1px 5px", fontFamily: "Arial, sans serif", fontSize: "12px"}
                      , 
                        this.state.expandedRelatedIdeas[relation.targetId] ? 
                          {color:"black", border:"1px solid black"} : 
                          {color:"maroon", border:"1px solid lightgray"}
                      )
                  }>
                {!broken ? note.txt : 'broken: ' + relation.userInputText}
              </span>)}
          </span>
{/*
    //        <AddRelatedForm
    //   note={this.props.note}
    //   rawRelations={this.props.rawRelations}
    //   relatedNotes={this.props.relatedNotes}
    //   relateToCurrentIdea={ (targetId) => this.props.addRelation(id, targetId) }
    //   addNote={this.props.addNote}
    //   allNotes={this.props.allNotes}
    // />
    //   addRelation={this.props.addRelation}
    //   onEdit={this.props.editNote}
    //   filteredNotes={filterEntries(this.state.notes, this.state.filter)}
    //   relations={relations}

      // note={this.props.note}
      // rawRelations={this.props.rawRelations}
      // relatedNotes={this.props.relatedNotes}
      // relateToCurrentIdea={ (targetId) => this.props.addRelation(id, targetId) }
      // addNote={this.props.addNote}

      // allNotes={this.props.allNotes}

      // addRelation={this.props.addRelation}
      //       addNote={this.props.addNote}
      //       editNote={this.props.editNote}
    */}

          <div>
            <Notes
            addRelation={this.props.addRelation}
            addNote={this.props.addNote}
            editNote={this.props.editNote}
            parentNodeState={this.props.nodeState}
            allNotes={this.props.allNotes}
            filteredNotes={this.props.allNotes.filter(x => {
              console.log(x.id, !!this.state.expandedRelatedIdeas[x.id])

              return !!this.state.expandedRelatedIdeas[x.id]
            })}
            relations={this.props.relations}
            rawRelations={this.props.rawRelations}
            />
          </div>
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
  note: React.PropTypes.object.isRequired,
  nodeState: React.PropTypes.isRequired,

  addRelation: React.PropTypes.func.isRequired,
  relations: React.PropTypes.array.isRequired,
  editNote: React.PropTypes.func.isRequired
};
