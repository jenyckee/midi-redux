import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export class Note extends React.Component<void, Props, void> {

  render () {
    return (
      <div className='note'>
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
