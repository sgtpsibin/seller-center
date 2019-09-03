import { RECEIVE_ORDERS, RECEIVE_ORDER } from "./actionTypes";

export const addOrdersToStore = payload => ({
  type: RECEIVE_ORDERS,
  payload
});

export const addOrder = payload => ({
  type: RECEIVE_ORDER,
  payload
});
