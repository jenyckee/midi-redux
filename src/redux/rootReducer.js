import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import midi from './modules/midi'

export default combineReducers({
  router,
  midi
})
