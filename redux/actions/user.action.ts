import { GET_USER_DATA } from './actionTypes';

export const getUserData = (UserData) => (dispatch) =>{
    dispatch({type:GET_USER_DATA,payload:UserData});
}