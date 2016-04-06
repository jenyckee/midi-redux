/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const NOTE_UP = 'NOTE_UP'

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.
export function noteUp (midiChannel: number = 1, pitchValue: number = 1, velocityValue: number = 1): Action {
  return {
      type: NOTE_UP,
      midiChannel: midiChannel,
      pitchValue: pitchValue,
      velocityValue: velocityValue
  }
}

export const actions = {
  noteUp
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [NOTE_UP]: (state: number, action: {payload: number}): number => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state: number = initialState, action: Action): number {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
