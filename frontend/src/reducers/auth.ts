import {
  SET_CURRENT_USER,
  USER_LOADING,
  AuthState,
  AuthActionTypes,
} from '../types/auth';

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
  loading: false,
};

export const authReducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.payload,
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
