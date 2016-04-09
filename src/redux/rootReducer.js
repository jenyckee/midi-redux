import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
// import note from './modules/note'
import midi from './modules/midi'

export default combineReducers({
  counter,
  router,
  midi
})
