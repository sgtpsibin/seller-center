import {TOOGLE_NAVIGATION,LOADING,LOADED} from '../actions/actionTypes';

const initialState = {
    showMobileNavigation: false,
    isLoading: false
}
const layoutReducer = (state =initialState,action) => {
    switch (action.type) {
        case TOOGLE_NAVIGATION:            
            return {...state,showMobileNavigation:!state.showMobileNavigation};  
        case LOADING:
            return {...state,isLoading:true};
        case LOADED:
            return {...state,isLoading:false};
        default:
            return state;
    }
}
export default layoutReducer;