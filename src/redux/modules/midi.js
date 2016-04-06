/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const MIDI_OK = 'MIDI_OK'
export const MIDI_ERROR = 'MIDI_ERROR'

export function requestMIDI(): Action {
  return dispatch => new Promise((resolve, reject) => {
    function onMIDISuccess(midiAcces) {
      dispatch({type: MIDI_OK, value: midiAcces})
      resolve(response)
    }
    function onMIDIFailure(error) {
      dispatch({type: MIDI_ERROR, value: error})
    }
    navigator.requestMIDIAccess( { sysex: true } ).then(onMIDISuccess, onMIDIFailure)
  })
}
// navigator.requestMIDIAccess( { sysex: true } ).then( this.onMIDISuccess, this.onMIDIFailure )

const ACTION_HANDLERS = {
  [MIDI_OK]: (state: object, action: object): state => action
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function midiReducer (state: object = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
