/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { increment, doubleAsync } from '../../redux/modules/counter'
import { asyncRequestMIDI, requestMIDI } from '../../redux/modules/midi'

// import DuckImage from './Duck.jpg'
import classes from './HomeView.scss'

// import Note from '../../components/note'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
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
