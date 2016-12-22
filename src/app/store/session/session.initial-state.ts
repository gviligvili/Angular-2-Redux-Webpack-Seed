import {
  ISession,
  IUser,
} from './session.types';

var initUser: IUser = {
    firstName: "",
    lastName : ""
};
export const INITIAL_USER_STATE = initUser

var initSession : ISession = {
  token: null,
  user: INITIAL_USER_STATE,
  hasError: false,
  isLoading: false,
};

export const INITIAL_SESSION_STATE = initSession;
