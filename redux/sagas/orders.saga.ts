import axios from 'axios';
import { put } from 'redux-saga/effects';
import { addOrdersToStore } from '../actions/orders.action';

export function* fetchOrders() {
    try {
        yield put({type:'LOADING_ORDERS'});
        const respone = yield axios.get(
                                process.env.API_ROOT_URL+'/orders.json',
                                { headers: {"Authorization" : `Bearer ${process.env.DEV_TOKEN}`} });
                                console.log(respone);
        const { orders } = respone.data;
        yield put(addOrdersToStore(orders));
    } catch (e) {
        console.log(e);
    }
}

export function* fetchOrdersWithQuery(action) {
    const {query} = action;
    try {
        console.log(query);
        yield put({type:'LOADING_ORDERS'});
        const respone = yield axios.get(
                                process.env.API_ROOT_URL+'/orders.json?'+query,
                                { headers: {"Authorization" : `Bearer ${process.env.DEV_TOKEN}`}});
        const { orders } = respone.data;
        yield put(addOrdersToStore(orders));
    } catch (e) {
        console.log(e);
    }
}
