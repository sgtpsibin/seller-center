import axios from 'axios';
import { put } from 'redux-saga/effects';
import { addOrdersToStore } from '../actions/orders.action';

export function* fetchOrders() {
    try {
        const respone = yield axios.get(
                                process.env.API_ROOT_URL+'/orders.json',
                                { headers: {"Authorization" : `Bearer ${process.env.DEV_TOKEN}`} });
        const { orders } = respone.data;
        yield put(addOrdersToStore(orders));
    } catch (e) {
        console.log(e);
    }
}