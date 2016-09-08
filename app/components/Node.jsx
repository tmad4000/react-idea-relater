import React from 'react'
import AddRelatedForm from './AddRelatedForm'

export default class Node extends React.Component {

  constructor(props) {
    super(props)
    const ind = this.props.ind

  }

  shallowEqualsObj = (o1, o2, excludingKeys=[]) => {
    let ks = Object.keys(o1)
    
    for(let i=0;i<ks.length;i++) {
      if(excludingKeys.includes(ks[i]))
        continue;


      if( (ks[i] in o2) && o2[ks[i]]!==o1[ks[i]])
        return false;
    }
    return true
  }

  shouldComponentUpdate(nextProps) {

      if(!this.shallowEqualsObj(this.props,   nextProps))
        return true
      else if(this.props.note &&  !this.shallowEqualsObj(this.props.note, nextProps.note,["x","y"]))
        return true
      else
        return false

  }

  render() {

    const {id, txt, htmlTxt,x,y} = this.props.note

    return (<circle onClick={(e) => {alert()}} r="5" fill="#1f77b4" style={{"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0);"}} 
        cx={x} cy={y}>
          <title>txt</title>
      </circle>)

  }
}

