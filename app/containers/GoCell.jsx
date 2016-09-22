import React from 'react'
import { connect } from 'react-redux'
import { playStone} from '../actions'


class GoCell extends React.Component {

  constructor(props) {
    super(props)
  }


  addNote = (text = "New text") => {
    this.props.dispatch(addNote(text))
  }


  render() {
    const {notes} = this.props;

    let color = ""
    // switch(2) {
    switch(this.props.whoseStone) {
      case 1:
        color="white"
        break
      case 2:
        color="black"
        break
      default:
        color="transparent"
    }


    return (

        <div
          onClick={() => this.props.onStoneClick(this.props.key)}
          style={{backgroundColor:color, display:"inline-block", width:"30px",height:"30px",border:"1px solid red"}}>
          &nbsp;
        </div>

    )

  }

}


// todos: PropTypes.arrayOf(PropTypes.shape({
//   id: PropTypes.number.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }).isRequired).isRequired,


TodoList.propTypes = {

  whoseStone: PropTypes.number
  onStoneClick: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    whoseStone: state.goSystem.whoseStone,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStoneClick: (id) => {
      dispatch(playStone(id))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(GoCell)
