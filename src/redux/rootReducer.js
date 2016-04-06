import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import note from './modules/note'

export default combineReducers({
  counter,
  note,
  router
})
