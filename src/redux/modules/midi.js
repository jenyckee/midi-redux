/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const MIDI_LOADING = 'MIDI_LOADING'

export function requestMIDI(): Action {
  return dispatch => new Promise((resolve, reject) => {
      navigator.requestMIDIAccess().then((midiAcces) => {
         dispatch({type: SOME_ACTION, value: midiAcces});
         resolve(response);
      });
  });
}
