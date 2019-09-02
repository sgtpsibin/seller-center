import axios from 'axios';
import { put } from 'redux-saga/effects';
import {receiveUserData} from '../actions/user.action';

export function* getUserData() {
    try {
        const respone = yield axios.get(
                                process.env.AUTH_INFO_API,
                                { headers: {"Authorization" : `Bearer ${localStorage.authToken}`} });
        // console.log(respone);
        const {shop,user} = respone.data.data;
        const userData = {
            shop,
            user
        };
        yield put(receiveUserData(userData));
    } catch (e) {
        localStorage.removeItem('authToken');
    }
}