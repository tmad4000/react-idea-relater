
import React from 'react'


export default class TttCell extends React.Component {
  constructor(props) {
    super(props)

  }

  tttDrawPlayer = () => {
    dispatch(playCell(this.props.key, this.props.turn))
  }

  render() {
     return (
      <div
        onClick={this.tttDrawPlayer}
        style={ {width: "30px", height: "30px", border: "1px solid black",
                float: "left",
                cursor:  "pointer"} } >
        {this.props.tttBoxState}
      </div>
    )

  }

}

TttCell.propTypes = {
  nextTurn: React.PropTypes.func.isRequired,
  turn: React.PropTypes.string.isRequired,
};
