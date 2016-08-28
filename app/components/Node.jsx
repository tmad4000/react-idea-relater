import React from 'react'
import AddRelatedForm from './AddRelatedForm'

export default class Node extends React.Component {

  constructor(props) {
    super(props)
    const ind = this.props.ind

  }

  render() {

    const {id, txt, htmlTxt,x,y} = this.props.note

    return (<circle onClick={(e) => {alert()}} r="5" fill="#1f77b4" style={{"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0);"}} 
        cx={x} cy={y}>
          <title>txt</title>
      </circle>)

  }
}

