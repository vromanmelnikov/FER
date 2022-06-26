import { combineReducers, createStore,  } from 'redux'
import photosReducer from './photosReducer'

let reducers = combineReducers({
    photoData: photosReducer
})

let store = createStore(reducers)

export default store