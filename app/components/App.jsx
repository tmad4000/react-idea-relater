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
    //   source: uuid.v4(),
    //   target: uuid.v4(),
    //   label: 'Learn Webpack'
    // }

  }


componentDidMount() {


        // setTimeout(() => {

        //   var svg = d3.select("#pure-d3 svg"),

        //       width = +svg.attr("width"),
        //       height = +svg.attr("height");

        //   var color = d3.scaleOrdinal(d3.schemeCategory20);

        //   var simulation = d3.forceSimulation()
        //       .force("link", d3.forceLink().id(function(d) { return d.id; }))
        //       .force("charge", d3.forceManyBody())
        //       .force("center", d3.forceCenter(width / 2, height / 2));


        //     let graph = {}
        //     graph.nodes = this.state.notes
        //     graph.links = this.state.relations

        //     graph.nodes = this.state.notes.map((e) => Object.assign({},e))
        //     graph.links = this.state.relations.map((e) => Object.assign({},e))
        //     // graph.links = this.state.relations.map((e) => Object.assign({source: e.source, target: e.target},e))

        //     d3.select("#pure-d3 #num-nodes").html(graph.nodes.length)
        //     d3.select("#pure-d3 #num-links").html(graph.links.length)
        //     console.log(graph.nodes.length, " nodes", graph.links.length, " edges")




        //     var link = svg.append("g")
        //         .attr("class", "links")
        //       .selectAll("#pure-d3 line")
        //       .data(graph.links)
        //       .enter().append("line")


        //     var node = svg.append("g")
        //         .attr("class", "nodes")
        //       .selectAll("#pure-d3 circle")
        //       .data(graph.nodes)
        //       .enter().append("g")
        //         .call(d3.drag()
        //             .on("start", dragstarted)
        //             .on("drag", dragged)
        //             .on("end", dragended))
              
        //       node.append("circle")
        //         .attr("r", 5)
        //         .attr("fill", function(d) { return color(d.group); })

        //       node.append("text")
        //         .attr("dx", 7)
        //         .attr("dy", ".35em")
        //         .text(function(d) { return d.txt });
                
        //     node.append("title")
        //         .text(function(d) { return d.id; });

        //     simulation
        //         .nodes(graph.nodes)
        //         .on("tick", ticked);

        //     simulation.force("link")
        //         .links(graph.links);


        //     let lastFrameTimeDiffMS = 0;
        //     let lastFrameTimeMS = 0;
        //     function ticked() {
              
        //       const t = Date.now()
              
        //       lastFrameTimeDiffMS = t-lastFrameTimeMS
        //       lastFrameTimeMS = t
        //       d3.select("#pure-d3 #fps").html( (1000/lastFrameTimeDiffMS).toFixed(1) )


        //       svg.selectAll("#pure-d3 line")
        //           .attr("x1", function(d) { return d.source.x; })
        //           .attr("y1", function(d) { return d.source.y; })
        //           .attr("x2", function(d) { return d.target.x; })
        //           .attr("y2", function(d) { return d.target.y; });

        //       svg.selectAll("#pure-d3 circle")
        //           .attr("cx", function(d) { return d.x; })
        //           .attr("cy", function(d) { return d.y; });

        //       svg.selectAll("#pure-d3 text")
        //           .attr("x", function(d) { return d.x; })
        //           .attr("y", function(d) { return d.y; });
        //     }


        //   function dragstarted(d) {
        //     if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        //     d.fx = d.x;
        //     d.fy = d.y;
        //   }

        //   function dragged(d) {
        //     d.fx = d3.event.x;
        //     d.fy = d3.event.y;
        //   }

        //   function dragended(d) {
        //     if (!d3.event.active) simulation.alphaTarget(0);
        //     d.fx = null;
        //     d.fy = null;
        //   }


        //   var graphStarted = true;
        //   d3.select("#pure-d3 #play-pause").on("click", 
        //     () => {
        //       if(graphStarted) {
        //         graphStarted = false
        //         d3.select("#pure-d3 #play-pause").html("Pause")
        //         return simulation.stop()
        //       }
        //       else {
        //         graphStarted = true
        //         d3.select("#pure-d3 #play-pause").html("Play")
        //         return simulation.restart()
        //       }
        //     })


        // }, 1000)




        setTimeout(() => {
console.log(this.state)
          var svg = d3.select("#hybrid-graph svg"),
              width = +svg.attr("width"),
              height = +svg.attr("height");

          var color = d3.scaleOrdinal(d3.schemeCategory20);

          var simulation = d3.forceSimulation()
              .force("link", d3.forceLink().id(function(d) { return d.id; }))
              .force("charge", d3.forceManyBody())
              .force("center", d3.forceCenter(width / 2, height / 2));


            let graph = {}
            // graph.nodes = this.state.notes
            // graph.links = this.state.relations

            graph.nodes = this.state.notes.map((e) => Object.assign({},e))
            graph.links = this.state.relations.map((e) => Object.assign({},e))
            // graph.links = this.state.relations.map((e) => Object.assign({source: e.source, target: e.target},e))

            // d3.select("#hybrid-graph #num-nodes").html(graph.nodes.length)
            // d3.select("#hybrid-graph #num-links").html(graph.links.length)
            console.log(graph.nodes.length, " nodes", graph.links.length, " edges")




            var link = svg.append("g")
                .attr("class", "links")
              .selectAll("#hybrid-graph line")
              .data(graph.links)
              // .enter().append("line")


            var node = svg.append("g")
                .attr("class", "nodes")
              .selectAll("#hybrid-graph circle")
              .data(graph.nodes)
              // .enter().append("g")
              //   .call(d3.drag()
              //       .on("start", dragstarted)
              //       .on("drag", dragged)
              //       .on("end", dragended))
              
              node.append("circle")
                .attr("r", 5)
                .attr("fill", function(d) { return color(d.group); })

              node.append("text")
                .attr("dx", 7)
                .attr("dy", ".35em")
                .text(function(d) { return d.txt });
                
            node.append("title")
                .text(function(d) { return d.id; });

            simulation
                .nodes(graph.nodes)
                .on("tick", ticked);

            simulation.force("link")
                .links(graph.links);


            let lastFrameTimeDiffMS = 0;
            let lastFrameTimeMS = 0;


            function ticked() {
              
              const t = Date.now()
              
              lastFrameTimeDiffMS = t-lastFrameTimeMS
              lastFrameTimeMS = t
              d3.select("#hybrid-graph #fps").html( (1000/lastFrameTimeDiffMS).toFixed(1) )


              svg.selectAll("#hybrid-graph line")
                  .attr("x1", function(d) { if(!d || !d.source) {
                                   console.log(this.state)
                                    debugger

                                  }

                    return d.source.x; 
                  })
                  .attr("y1", function(d) { return d.source.y; })
                  .attr("x2", function(d) { return d.target.x; })
                  .attr("y2", function(d) { return d.target.y; });

              svg.selectAll("#hybrid-graph circle")
                  .attr("cx", function(d) { return d.x; })
                  .attr("cy", function(d) { return d.y; });

              svg.selectAll("#hybrid-graph text")
                  .attr("x", function(d) { return d.x; })
                  .attr("y", function(d) { return d.y; });
            }


          function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          }

          function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
          }

          function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }


          var graphStarted = true;
          d3.select("#hybrid-graph #play-pause").on("click", 
            () => {
              if(graphStarted) {
                graphStarted = false
                d3.select("#hybrid-graph #play-pause").html("Pause")
                return simulation.stop()
              }
              else {
                graphStarted = true
                d3.select("#hybrid-graph #play-pause").html("Play")
                return simulation.restart()
              }
            })


        }, 5000)

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


    let newRels = []

    for(let i=0;i<7;i++) {
      const x=this.createRelations(newNotes[0].id,newNotes[i].id )
      newRels=newRels.concat(x)

    }

     for(let i=0;i<4;i++)
      newRels=newRels.concat(this.createRelations(newNotes[12].id,newNotes[i].id ))

    debugger

    this.setState({
      notes: newNotes,
      relations: newRels
     })
   
  


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

  createRelations = (source, target) => {
    if(source === target) {
      console.error("reflexive relation attempt!", source)
      return []
    }


    return [{
          id: uuid.v4(),
          source: source,
          target: target,
          label: ''
        },
        {
          id: uuid.v4(),
          source: target,
          target: source,
          label: ''
        }]

  }

  addRelation = (source, target) => {

    if(this.state.relations.filter( (rel) => rel.source === source && rel.target === target ).length > 0 ) {
      console.error("relation already exists!", source, target)
      return false
    }

    const newRels = this.createRelations(source,target)

    this.setState({
      relations: this.state.relations.concat(newRels)
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
          const targetea = this.state.notes
            .find(note => note.id != i && note.txt.toLowerCase().indexOf(relation.toLowerCase()) != -1)
          return [{
            id: i + '-'+ (2*j),
            mirrorRelationId: i + '-'+ (2*j+1),
            userInputText: relation,
            source: i + '',
            target: targetea ? targetea.id : null,
            broken: targetea ? false : true,
          }, {
            id: i + '-' + (2*j+1),
            mirrorRelationId: i + '-'+ (2*j),
            userInputText: relation,
            source: targetea ? targetea.id : null,
            target: i + '',
            broken: targetea ? false : true,
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
        <div style={{border:"1px solid gray",position:"relative"}} id="hybrid-graph">
            <div style={{position:"absolute", top:"10px", left:"10px"}} className="floating-graph-controls">
              <button id="play-pause" onClick={() => {
                /*if(!this.state.playTimeoutId)
                  this.playGraph(); 
                else 
                  this.pauseGraph();

*/
                  }
                }>
                  {this.state.playTimeoutId ? "Pause" : "Play"}
                </button>
                
                <span> <span id="fps"></span> FPS </span>
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
        <div style={{border:"1px solid gray",position:"relative"}} id="pure-d3">
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
