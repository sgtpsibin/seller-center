import { RECEIVE_ORDERS } from './actionTypes';

export const addOrdersToStore = (payload) => ({
    type: RECEIVE_ORDERS,
    payload
});