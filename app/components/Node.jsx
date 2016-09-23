import React from 'react'
import AddRelatedForm from './AddRelatedForm'
import { shallowEqualsObj } from './utils'

export default class Node extends React.Component {

  constructor(props) {
    super(props)
    const ind = this.props.ind

  }

  

  shouldComponentUpdate(nextProps) {

      //not shallowly equal because filterEntries copies

      // if(!shallowEqualsObj(this.props,   nextProps))
      //   return true

      if(this.props.note &&  !shallowEqualsObj(this.props.note, nextProps.note, ["x","y"])) 
        return true
      else
        return false

  }

  render() {

    const {id, txt, htmlTxt,x,y} = this.props.note

    // return (
    //     <circle onClick={(e) => {alert()}} r="5" fill={txt=="New txt" ? "red" : "#1f77b4"} style={{"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0);"}} 
    //       cx={x} cy={y}>
    //         <title>{txt}</title>
    //     </circle>
    //   )

    return (
      <g className="node-g">
        <circle r="5" fill={txt=="New txt" ? "red" : "#1f77b4"} style={{"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0);"}} 
          cx={x} cy={y} 
          ref={ (e) => {
             if(e && !("__data__" in e)) {
              console.log("refrun")

                e.__data__= {} 
                e.__data__.x=this.props.note.x;
                e.__data__.y=this.props.note.y;
                e.__data__.vx=this.props.note.vx;
                e.__data__.vy=this.props.note.vy;
              }
              // setTimeout( () => { console.log("data",Object.getOwnPropertyNames(e)); e.__someattr__="hello" }, 3000) 
            } 
          }
          >
            <title>{txt}</title>
            
        </circle>
        <text dx="7" dy="0.3em" x={x} y={y}
         ref={ (e) => {

            if(e && !("__data__" in e)) {

              e.__data__= {} 
              e.__data__.x=this.props.note.x;
              e.__data__.y=this.props.note.y;
              e.__data__.vx=this.props.note.vx;
              e.__data__.vy=this.props.note.vy;
            }
              // setTimeout( () => { console.log("data",Object.getOwnPropertyNames(e)); e.__someattr__="hello" }, 3000) 
            } 
          }

          >{txt}</text>
      </g>
      )

  }
}

