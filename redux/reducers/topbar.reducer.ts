import {TOOGLE_NAVIGATION} from '../actions/actionTypes';

const initialState = {
    showMobileNavigation: false
}
const topbarReducer = (state =initialState,action) => {
    switch (action.type) {
        case TOOGLE_NAVIGATION:            
            console.log("OK");
            return {...state,showMobileNavigation:!state.showMobileNavigation};
    
        default:
            return state;
    }
}
export default topbarReducer;