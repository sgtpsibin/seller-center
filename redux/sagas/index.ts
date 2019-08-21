import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'

import { TOOGLE_NAVIGATION } from '../actions/actionTypes'

es6promise.polyfill()



function * rootSaga () {
  yield all([
    takeLatest(TOOGLE_NAVIGATION, ()=>{console.log('SAGA OK')})
  ])
}

export default rootSaga