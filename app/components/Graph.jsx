  import React from 'react'
import Note from './Note.jsx'
import Node from './Node.jsx'

export default class Graph extends React.Component {


    render() {

        return (
          <svg style={{flex:"1 1"}} width="960" height="600">
            <g className="links">
               {
                    this.props.relations.map(

                        (rel,i) => {
                          // let x=100*(1+i/8);
                          // let y=100*(1.5+Math.sin(i/2));
                          const s=this.props.filteredNotes.find(note => note.id===rel.sourceId)
                          const t=this.props.filteredNotes.find(note => note.id===rel.targetId)
                          if(s!==undefined&&t!==undefined)
                            return <line key={i} strokeWidth="5" x1={s.x} y1={s.y} x2={t.x} y2={t.y}></line>

                        }
                            
                    )
                }


            </g>
            <g className="nodes">
              {
                    this.props.filteredNotes.map(

                        (note,i) => {
                          // let x=100*(1+i/8);
                          // let y=100*(1.5+Math.sin(i/2));

                          return <Node key={i} note={note}   />
                        }
                            
                    )
                }


            </g>
          </svg>
           
        )
    }



      //<Note onEdit={this.props.onEdit.bind(undefined,n.id)} txt={n.txt} />

}
