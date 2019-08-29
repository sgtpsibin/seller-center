import { RECEIVE_ORDERS,LOADING_ORDERS } from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading:true   
};

const ordersReducer = (state=initialState,action) => {
    switch (action.type) {
        
        case RECEIVE_ORDERS:        
            return {...state,orders:action.orders,loading:false}
        case LOADING_ORDERS:
            return {...state,loading:true}
    
        default:
            return state;
    }
}

export default ordersReducer;