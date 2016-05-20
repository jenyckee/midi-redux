/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { asyncRequestMIDI } from '../../redux/modules/midi'
// import classes from './HomeView.scss'
import Note from '../../components/note'
import Scene from '../../components/scene'
import teoria from 'teoria'

type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function,
  requestMIDI: Function,
  midiState: Object
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
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <Note midiState={this.props.midiState} note={teoria.note('c4')}/>
            </div>
          </div>
        </div>
        <Scene midiState={this.props.midiState} />
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  midiState: state.midi
})
export default connect((mapStateToProps), {
  requestMIDI: asyncRequestMIDI
})(HomeView)
