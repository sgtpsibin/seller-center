import {
  RECEIVE_ORDERS,
  LOADING_ORDERS,
  UPDATE_SHIPPING_INFO,
  RECEIVE_ORDER
} from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: true,
  totalOrder: 0,
  order: {}
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        totalOrder: action.payload.totalOrder,
        loading: false,
        newFilter: false
      };
    case RECEIVE_ORDER:
      return { ...state, order: action.payload };

    case LOADING_ORDERS:
      return { ...state, loading: true };

    default:
      return state;
  }
};

export default ordersReducer;
