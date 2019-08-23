import { REQUEST_USER_DATA, RECEIVE_USER_DATA } from './actionTypes';

export const receiveUserData = userData => ({type:RECEIVE_USER_DATA,payload:userData}); 