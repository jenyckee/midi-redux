/* @flow */

import 'Immutable'
// ------------------------------------
// Constants
// ------------------------------------
export const MIDI_OK = 'MIDI_OK'
export const MIDI_MESSAGE = 'MIDI_MESSAGE'


export function requestMIDI (value: object): Action {
  return {
    type: MIDI_OK,
    access: value
  }
}

export const asyncRequestMIDI = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    navigator.requestMIDIAccess({sysex: true})
      .then((midiAccess) => {
        midiAccess.inputs.forEach((entry) => {
          entry.onmidimessage = event => {
            dispatch(midiMessage(event))
          }
        })
        dispatch(requestMIDI(midiAccess))
      })
  }
}

export function midiMessage (event) {
  return {
    type: MIDI_MESSAGE,
    message: event.data
  }
}

export const actions = {
  requestMIDI
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [MIDI_OK]: (state: object, action: {access: Object}): Object => {
    return { midiAccess: action.access, midiState: {} }
  },
  [MIDI_MESSAGE]: (state, action) => {
    switch (action.message[0]) {
      case 144:
        console.log("note on")
        return state.midiState[action.message[1].toString()] = action.message[2]
        break
      case 128:
        console.log("note off")
        return state.midiState[action.message[1].toString()] = action.message[2]
        break
      default:
        return state
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { midiAccess: {}, midiState: {} }
export default function midiReducer (state: object = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
