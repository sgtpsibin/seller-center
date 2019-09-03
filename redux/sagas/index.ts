import { all, takeLatest, takeEvery } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'

import { TOOGLE_NAVIGATION,REQUEST_USER_DATA,REQUEST_ORDERS,REQUEST_ORDERS_WITH_QUERY} from '../actions/actionTypes';

import { getUserData } from './user.saga';
import { fetchOrders,fetchOrdersWithQuery } from './orders.saga';

es6promise.polyfill();

function* rootSaga () {
  yield all([
    takeLatest(TOOGLE_NAVIGATION, ()=>{console.log('SAGA OK')}),
    takeEvery(REQUEST_USER_DATA,getUserData),
    takeEvery(REQUEST_ORDERS,fetchOrders),
    takeEvery(REQUEST_ORDERS_WITH_QUERY,fetchOrdersWithQuery)
  ])
  
}

export default rootSaga