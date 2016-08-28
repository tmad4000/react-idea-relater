import React from 'react'
import Note from './Note.jsx'
import Node from './Node.jsx'

export default class Graph extends React.Component {

    render() {

        return (
          <svg  height="600" width="100%">
            <g className="links">
              <line strokeWidth="1" x1="301.80209868487435" y1="433.2357884841053" x2="318.82676315373936" y2="394.79555522636133"></line>
            </g>
            <g className="nodes">
              <circle r="5" fill="#1f77b4" style={{"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0);"}} cx="0" cy="0">
                <title>Myriel</title>
              </circle>
              <circle r="5" fill="#1f77b4" style={{"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0);"}} cx="100" cy="">
                <title>Myriel</title>
              </circle>


              {
                    this.props.filteredNotes.map(

                        (note,i) => {
                          let x=100*(1+i/8);
                          let y=100*(1.5+Math.sin(i/2));

                          return <Node ind={i} note={note} x={x} y={y} />
                        }
                            
                    )
                }


            </g>
          </svg>
           
        )
    }



      //<Note onEdit={this.props.onEdit.bind(undefined,n.id)} txt={n.txt} />

}
