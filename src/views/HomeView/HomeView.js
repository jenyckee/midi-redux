/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { asyncRequestMIDI } from '../../redux/modules/midi'
// import classes from './HomeView.scss'
// import Note from '../../components/note'

type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function,
  requestMIDI: Function,
  midiAccess: Object
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    requestMIDI: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.requestMIDI()
  }

  render () {
    return (
      <div className='container text-center'>
        <div className='row'>
          <div className='col-xs-2 col-xs-offset-5'>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  midiAccess: state.midi
})
export default connect((mapStateToProps), {
  requestMIDI: () => asyncRequestMIDI()
})(HomeView)
