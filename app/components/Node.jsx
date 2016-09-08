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

      if(this.props.note &&  !shallowEqualsObj(this.props.note, nextProps.note,["x","y"]))
        return true
      else
        return false

  }

  render() {

    const {id, txt, htmlTxt,x,y} = this.props.note

    return (<circle onClick={(e) => {alert()}} r="5" title={txt} fill={txt=="New txt" ? "red" : "#1f77b4"} style={{"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0);"}} 
        cx={x} cy={y}>
          <title>txt</title>
      </circle>)

  }
}

