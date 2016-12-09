// TODO: move to more appropriate location

export default class NodeState {
  constructor () {
    this._childStates = {}
  }

  getChildState (nodeKey) {
    if (!this._childStates[nodeKey]) {
      this._childStates[nodeKey] = new NodeState()
    }

    return this._childStates[nodeKey]
  }
}
