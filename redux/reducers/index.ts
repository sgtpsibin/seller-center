import {combineReducers} from 'redux';
import topbarReducer from './topbar.reducer';

const allreducer = combineReducers({
  topbar: topbarReducer
})

export default allreducer