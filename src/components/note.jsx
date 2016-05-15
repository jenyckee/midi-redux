import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import classnames from 'classnames'

export class Note extends React.Component<void, Props, void> {

  render () {
    return (
      <div className={classnames({
        note: true,
        played: this.props.midiState.get("60")
      })}>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.noteDown
})
export default connect((mapStateToProps), {
  noteDown: () => noteDown(true)
})(Note)
