import { all, takeLatest, takeEvery } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'

import { TOOGLE_NAVIGATION,REQUEST_USER_DATA } from '../actions/actionTypes';
import {getUserData} from './user.saga';

es6promise.polyfill();

function* rootSaga () {
  yield all([
    takeLatest(TOOGLE_NAVIGATION, ()=>{console.log('SAGA OK')}),
    takeEvery(REQUEST_USER_DATA,getUserData)
  ])
}

export default rootSaga