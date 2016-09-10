import React from 'react'
import Notes from './Notes.jsx'
import Graph from './Graph.jsx'
import Node from './Node.jsx'
import uuid from 'node-uuid'
import * as d3 from "d3";


import { encodeHtmlEntity, filterEntries } from './utils.js'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state={
             filter: '',
             rawRelations: false,
             notes : [
            ],
            relations : [

            ],
             playTimeoutId:null
    }
    

    // relation:
    // {
    //   id: uuid.v4(),
    //   sourceId: uuid.v4(),
    //   targetId: uuid.v4(),
    //   label: 'Learn Webpack'
    // }

  }


componentDidMount() {

        // var svg = d3.select("svg"),
        //     width = +svg.attr("width"),
        //     height = +svg.attr("height");

        // var color = d3.scaleOrdinal(d3.schemeCategory20);

        // var simulation = d3.forceSimulation()
        //     .force("link", d3.forceLink().id(function(d) { return d.id; }))
        //     .force("charge", d3.forceManyBody())
        //     .force("center", d3.forceCenter(width / 2, height / 2));
        // console.log(height)

                
        // function ticked() {
        //     this.state.notes.forEach( (note) => {
        //         note.x=1;
        //     })


          //   this.notes.forEach((n) => 
          //     )
          // this.setState({

          // })
          //     .attr("x1", function(d) { return d.source.x; })
          //     .attr("y1", function(d) { return d.source.y; })
          //     .attr("x2", function(d) { return d.target.x; })
          //     .attr("y2", function(d) { return d.target.y; });

          // node
          //     .attr("cx", function(d) { return d.x; })
          //     .attr("cy", function(d) { return d.y; });
        // }

        // simulation
        //     .nodes(graph.nodes)
        //     .on("tick", ticked);

        // simulation.force("link")
        //     .links(graph.links);


    }



  componentWillMount() {

    let newNotes = []
    for(let i=0; i<1; i++){
      //#hack
      newNotes.push(this.createNote("Learn Webpack <b> dfdf </b>"))
      newNotes.push(this.createNote("Learn React"))
      newNotes.push(this.createNote("Do laundry"))
      newNotes.push(this.createNote("Learn Webpack <b> dfdf </b>"))
      newNotes.push(this.createNote("Learn React"))
      newNotes.push(this.createNote("Do laundry"))
      newNotes.push(this.createNote("Learn Webpack <b> dfdf </b>"))
      newNotes.push(this.createNote("Learn React"))
      newNotes.push(this.createNote("Do laundry"))
      newNotes.push(this.createNote("Learn Webpack <b> dfdf </b>"))
      newNotes.push(this.createNote("Learn React"))
      newNotes.push(this.createNote("Do laundry"))
      newNotes.push(this.createNote("Learn Webpack <b> dfdf </b>"))
      newNotes.push(this.createNote("Learn React"))
      newNotes.push(this.createNote("Do laundry"))
      newNotes.push(this.createNote("Learn Webpack <b> dfdf </b>"))
      newNotes.push(this.createNote("Learn React"))
      newNotes.push(this.createNote("Do laundry"))
    }


    this.setState({
      notes: this.state.notes.concat(newNotes) })
   
    for(let i=0;i<7;i++)
      setTimeout(() =>  this.addRelation(this.state.notes[0].id,this.state.notes[i].id ), 0)

    for(let i=0;i<4;i++)
      setTimeout(() =>  this.addRelation(this.state.notes[12].id,this.state.notes[i].id ), 0)


   // setTimeout(() => {


   // }





  }


  // componentWillUpdate(nextProps,nextState) {
  //   if(nextState.graphPlaying) {
  //     this.playGraph();
  //   }
  //   else {
  //     clearTimeout(this.state.playTimeoutId)
  //   }
  // }

  playGraph = () => {

    this.state.notes.forEach( (note) => {
              note.x+=1;
          })

    // for(var i=0; i<100000; i++){
      
    //   this.state.notes.forEach( (note) => {
    //           note.x+=Math.random()*Math.sin(i);
    //       })
    // }



    clearTimeout(this.state.playTimeoutId)
    this.setState({"playTimeoutId":setTimeout( () => {
     
     this.playGraph() 
 
    const t = Date.now()
     this.setState({"lastFrameTimeDiffMS": t-this.state.lastFrameTimeMS, "lastFrameTimeMS": t})  

   }, 20)})

  }

  pauseGraph = () => {
              clearTimeout(this.state.playTimeoutId)
              this.setState({"playTimeoutId":null})
  }

  editNote = (id, value) => {
      const notes = this.state.notes.map( (note) => {
              if (note.id === id)
                  note.txt = value
              return note
          })


      this.setState({notes})

      //this.setState({
      //        notes: newNotes
      //    })
  }

  addRelation = (sourceId, targetId) => {
    if(sourceId === targetId) {
      console.error("reflexive relation attempt!", sourceId)
      return false
    }

    if(this.state.relations.filter( (rel) => rel.sourceId === sourceId && rel.targetId === targetId ).length > 0 ) {
      console.error("relation already exists!", sourceId, targetId)
      return false
    }


    this.setState({
      relations: this.state.relations.concat(
        [{
          id: uuid.v4(),
          sourceId: sourceId,
          targetId: targetId,
          label: ''
        },
        {
          id: uuid.v4(),
          sourceId: targetId,
          targetId: sourceId,
          label: ''
        }]
      )
    })

  }

  addNote = (text) => {

    const newNote = this.createNote(text)

    this.setState({
      notes: this.state.notes.concat(
        [
          newNote
        ])
    });

    return newNote.id;
  }

  createNote = (text = "New txt") => {
      const id = uuid.v4();

      return {
              id,
              txt: text,
              userInputText: text,
              x:400*Math.random(),
              y:400*Math.random(),

            }
    }

  // parseNotesFromText = (txt) => {
  //   return txt.split("\n\n").map( (noteTxt, i) => {
  //     return {
  //       id: ''+ i,
  //       txt: noteTxt
  //     }
  //   })
  // }
  //
  parseNotesFromText = (txt) => {
    const {notes, relations} = txt.split("\n\n")
      .map(this.parseOneNoteFromText)
      .reduce((aggregate, {notes,relations}) => ({
        notes: aggregate.notes.concat(notes),
        relations: aggregate.relations.concat(relations)
      }), {notes: [], relations: []})
    this.setState({notes, relations});
  }

  parseOneNoteFromText = (noteTxt,i) => {
    let relations = noteTxt.split("<>")
    const noteText = relations.shift()

    if (relations.length > 0) {
      relations = relations
        .map((relation) => relation.trim())
        .map((relation,j) => {
          const targetIdea = this.state.notes
            .find(note => note.id != i && note.txt.toLowerCase().indexOf(relation.toLowerCase()) != -1)
          return [{
            id: i + '-'+ (2*j),
            mirrorRelationId: i + '-'+ (2*j+1),
            userInputText: relation,
            sourceId: i + '',
            targetId: targetIdea ? targetIdea.id : null,
            broken: targetIdea ? false : true,
          }, {
            id: i + '-' + (2*j+1),
            mirrorRelationId: i + '-'+ (2*j),
            userInputText: relation,
            sourceId: targetIdea ? targetIdea.id : null,
            targetId: i + '',
            broken: targetIdea ? false : true,
          }];
        })
        .reduce((array, subArray) => array.concat(subArray), [])

      this.setState({
        relations: relations,
      })
    }
    const note = {
      id: i + '',
      txt: noteText,
      userInputText: noteTxt,
    }

    return {
      notes: [note],
      relations,
    }
  }



  render() {
    const {notes, relations} = this.state;

    // const suggestions = this.props.allNotes
    //     .filter( (note) => this.props.note && note.id !== this.props.note.id)
    //     .filter( (note) => note.txt.toLowerCase().indexOf(this.state.filter) !== -1);

    const searchText = this.refs.filter ? this.refs.filter.value : "";


    return (
      <div>
      <br />


      <div>
      <label >Search Tags/Keywords:<br />
      </label>

      <input
      type="text"
      placeholder="Search Tags/Keywords: "
      onChange={ (e) => this.setState({filter: e.target.value})}
      ref="filter" tabIndex="2" size="150" />



      <button id="clear">Clear</button>
      </div>
      <br />
      <br />




      <button onClick={() => this.addNote()}>+</button>
      <button onClick={() => this.setState({ rawRelations: !this.state.rawRelations })}>raw/complex relations</button>

      <div className="flexcontainer">
        <div style={{border:"1px solid gray"}} >

            <Notes
          addRelation={this.addRelation}
          addNote={this.addNote}
          onEdit={this.editNote}
          allNotes={this.state.notes}
          filteredNotes={filterEntries(this.state.notes, this.state.filter)}
          relations={relations}
          rawRelations={this.state.rawRelations}
          />
   
        </div>
        <div style={{border:"1px solid gray",position:"relative"}} >
            <div style={{position:"absolute", top:"10px", left:"10px"}} className="floating-graph-controls">
              <button onClick={() => {
                if(!this.state.playTimeoutId)
                  this.playGraph(); 
                else 
                  this.pauseGraph();


                  }
                }>
                  {this.state.playTimeoutId ? "Pause" : "Play"}
                </button>
                
                <span> {(1000/this.state.lastFrameTimeDiffMS).toFixed(3) } FPS </span>
                <span> nodes: {this.state.notes.length}, edges: {this.state.relations.length} </span>

              </div>
            <Graph
              addRelation={this.addRelation}
              addNote={this.addNote}
              onEdit={this.editNote}
              allNotes={this.state.notes}
              filteredNotes={filterEntries(this.state.notes, this.state.filter)}
              relations={relations}
              rawRelations={this.state.rawRelations}
            />
        </div>
        <div style={{border:"1px solid gray",position:"relative"}} >
            <div style={{position:"absolute", top:"10px", left:"10px"}} className="floating-graph-controls">
                <button id="play-pause">
                      Play
                </button>
                
                <span><span id="fps"></span>  FPS </span>
                <span> nodes: <span id="num-nodes"></span>, edges: <span id="num-links"></span> </span>

              </div>


              <svg width="960" height="600"></svg>
        </div>

      </div>

      <br />
      <br />

      To export letterspace docs:
      <pre>
      cd /Users/jacob/Library/Containers/com.x10studio.LetterspaceMac/Data/Documents/Home
      cat $(ls -t) > allLetterSpaceNotes.backup.txt
      </pre>
        {/*<pre>
          {JSON.stringify(this.state.relations,null,'\t')}
        </pre>*/}


      <textarea
        cols="150"
        rows="10"
        tabIndex="1"
        onChange={ (e) => this.parseNotesFromText(e.target.value) }
        value = { 'nothing' /*this.state.notes.map( (note) => note.userInputText).join("\n\n")*/ }
        />

        {/*
          <div
          contentEditable
          style={{width:'100%', height: '300px', backgroundColor: 'white', border: '1px solid black'}}
          tabIndex="1"
          onChange={ (e) => this.parseNotesFromText(e.target.value) }
          value = { this.state.notes.map( (note) => note.userInputText).join("\n\n") }
        />*/}

      </div>
    )

  }

}
