import {combineReducers} from 'redux';

import layoutReducer from './layout.reducer';
import userReducer from './user.reducer';
import ordersReducer from './orders.reducer';

const allreducer = combineReducers({
  layout: layoutReducer,
  user: userReducer,
  orders: ordersReducer
})

export default allreducer