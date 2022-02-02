import { CreateUser, User } from '../types';
import UserApi from '../api/user.api';
import { SET_ERRORS } from '../types/error';
import { SET_CURRENT_USER, USER_LOADING } from '../types/auth';

export const registerUser =
  (userData: CreateUser, history: any) => async (dispatch: any) => {
    try {
      const res = await UserApi.create(userData);
      console.log('Register: ', res.data);
      //   history.push('/')
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err,
      });
    }
  };

export const loginUser = (userData: User) => (dispatch: any) => {
  localStorage.setItem('slack_chat_user', JSON.stringify(userData));
  dispatch(setCurrentUser(userData));
};

export const setCurrentUser = (userData?: User) => {
  return {
    type: SET_CURRENT_USER,
    payload: userData,
  } as const;
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  } as const;
};

export const logoutUser = () => (dispatch: any) => {
  localStorage.removeItem('slack_chat_user');
  dispatch(setCurrentUser(undefined));
};
