import { RECEIVE_ORDERS } from './actionTypes';

export const addOrdersToStore = (orders) => ({
    type: RECEIVE_ORDERS,
    orders
});