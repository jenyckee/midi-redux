/* @flow */
import { Map } from 'immutable'
import teoria from 'teoria'

// ------------------------------------
// Constants
// ------------------------------------
export const MIDI_OK = 'MIDI_OK'
export const MIDI_MESSAGE = 'MIDI_MESSAGE'
export const MIDI_OUT_NOTE_DOWN = 'MIDI_OUT_NOTE_DOWN'
export const MIDI_OUT_NOTE_UP = 'MIDI_OUT_NOTE_UP'

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
          entry.onmidimessage = (event) => {
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

export function noteDown (note) {
  return {
    type: MIDI_OUT_NOTE_DOWN,
    message: note
  }
}

export function noteUp (note) {
  return {
    type: MIDI_OUT_NOTE_UP,
    message: note
  }
}


// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [MIDI_OK]: (state: object, action: {access: Object}): Object => {
    return state.set('midiAccess', action.access)
  },
  [MIDI_MESSAGE]: (state, action) => {
    switch (action.message[0]) {
      case 144:
        return state.set(action.message[1].toString(), action.message[2])
      case 128:
        return state.delete(action.message[1].toString())
      default:
        return state
    }
  },
  [MIDI_OUT_NOTE_DOWN]: (state, action) => {
    let midiAccess = state.get('midiAccess')
    var portID = "29211623"
    var noteDownMessage = [0x90, 60, 0x7f]    // note on, middle C, full velocity
    var output = midiAccess.outputs.get(portID)
    output.send( noteDownMessage )  //omitting the timestamp means send immediately.
    return state.set('60', 120)
  },
  [MIDI_OUT_NOTE_UP]: (state, action) => {
    let midiAccess = state.get('midiAccess')
    var portID = "29211623"
    var noteUpMessage = [0x80, 60, 0x40]   // note on, middle C, full velocity
    var output = midiAccess.outputs.get(portID)
    output.send( noteUpMessage )  //omitting the timestamp means send immediately.
    return state.delete('60')
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Map({})
export default function midiReducer (state: object = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
