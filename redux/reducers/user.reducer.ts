import { RECEIVE_USER_DATA } from "../actions/actionTypes";

const initialState = {
  shop: {},
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER_DATA:
      return { ...state, shop: action.payload.shop, user: action.payload.user };

    default:
      return state;
  }
};

export default userReducer;
