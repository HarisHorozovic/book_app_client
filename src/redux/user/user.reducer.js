import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  userError: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        userError: null,
      };
    case UserActionTypes.REMOVE_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
        userError: null,
      };
    case UserActionTypes.SET_USER_ERROR:
      return {
        ...state,
        userError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
