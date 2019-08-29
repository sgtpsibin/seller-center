import { RECEIVE_ORDERS,LOADING_ORDERS } from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading:true,
    totalOrder: 0 
};

const ordersReducer = (state=initialState,action) => {
    switch (action.type) {
        
        case RECEIVE_ORDERS:        
            return {...state,orders:action.payload.orders,totalOrder:action.payload.totalOrder,loading:false}
        case LOADING_ORDERS:
            return {...state,loading:true}
    
        default:
            return state;
    }
}

export default ordersReducer;