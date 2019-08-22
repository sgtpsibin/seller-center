import {combineReducers} from 'redux';
import layoutReducer from './layout.reducer';
import userReducer from './user.reducer';

const allreducer = combineReducers({
  layout: layoutReducer,
  user: userReducer
})

export default allreducer