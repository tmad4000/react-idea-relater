// TODO: move to more appropriate location

export default class NodeState {
  constructor () {
    this._childStates = {}
  }

  getChildState (id) {
    if (!this._childStates[id]) {
      this._childStates[id] = new NodeState()
    }

    return this._childStates[id]
  }
}
