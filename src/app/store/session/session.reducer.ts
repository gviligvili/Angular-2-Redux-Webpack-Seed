import { IPayloadAction } from '../../actions';
import { SessionActions } from '../../actions/session.actions';
import { ISession } from './session.types';
import {
  INITIAL_SESSION_STATE,
  INITIAL_USER_STATE,
} from './session.initial-state';


export function sessionReducer(
  state: ISession = INITIAL_SESSION_STATE,
  action: IPayloadAction): ISession {

  switch (action.type) {
  case SessionActions.LOGIN_USER:
        return Object.assign({} ,state, {
          token: null,
          user: INITIAL_USER_STATE,
          hasError: false,
          isLoading: true,
        });

  case SessionActions.LOGIN_USER_SUCCESS:
      return Object.assign({} ,state, {
          token: action.payload.token,
          // Wrong way, should be initializer.
          user: Object.assign({},action.payload.profile),
          hasError: false,
          isLoading: false,
        });

  case SessionActions.LOGIN_USER_ERROR:
      return Object.assign({} ,state, {
          token: null,
          user: INITIAL_USER_STATE,
          hasError: true,
          isLoading: false,
        });

  case SessionActions.LOGOUT_USER:
    return INITIAL_SESSION_STATE;

  default:
    return state;
  }
}
