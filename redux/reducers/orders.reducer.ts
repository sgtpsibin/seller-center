import { RECEIVE_ORDERS } from '../actions/actionTypes';

const initialState = [];

const ordersReducer = (state=initialState,action) => {
    switch (action.type) {
        
        case RECEIVE_ORDERS:            
            return [...state,...action.orders]
    
        default:
            return state;
    }
}

export default ordersReducer;