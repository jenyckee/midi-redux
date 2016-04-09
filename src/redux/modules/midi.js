/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const MIDI_OK = 'MIDI_OK'

export function requestMIDI (value: object): Action {
  return {
    type: MIDI_OK,
    access: value
  }
}

export const asyncRequestMIDI = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    navigator.requestMIDIAccess({sysex: true})
      .then((midiAccess) => dispatch(requestMIDI(midiAccess)))
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
    return action.access
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null
export default function midiReducer (state: object = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
