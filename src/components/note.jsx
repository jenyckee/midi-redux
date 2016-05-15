import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { noteDown } from '../redux/modules/midi'


export class Note extends React.Component<void, Props, void> {
  classList () {
    return classnames({
      note: true,
      played: this.props.midiState.get('60')
    })
  }
  noteDown () {
    this.props.noteDown()
  }
  render () {
    return (
      <div className={this.classList()} onClick={this.noteDown}></div>
    )
  }
}

const mapStateToProps = (state) => ({
  noteDown: state.noteDown
})
export default connect((mapStateToProps), {
  noteDown: () => noteDown()
})(Note)
