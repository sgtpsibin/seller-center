import {combineReducers} from 'redux';
import layoutReducer from './layout.reducer';

const allreducer = combineReducers({
  layout: layoutReducer
})

export default allreducer