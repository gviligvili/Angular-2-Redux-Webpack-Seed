import { Iterable } from 'immutable';
import { ISession } from './session.types';
import { sessionReducer } from './session.reducer';
import { SessionActions } from '../../actions/session.actions';

describe('Session Reducer', () => {
  let initState: ISession;

  beforeEach(() => {
    initState = sessionReducer(undefined, { type: 'TEST_INIT'});
  });

  it('should have an immutable initial state', () => {
    expect(Iterable.isIterable(initState)).toBe(true);
  });

  it('should set loading to true on LOGIN_USER_PENDING', () => {
    const nextState = sessionReducer(
      initState,
      { type: SessionActions.LOGIN_USER });
    expect(nextState.isLoading).toBeTruthy;
    expect(nextState.token).toEqual(null);
  });

  it('should save the user token on LOGIN_USER_SUCCESS', () => {
    const nextState = sessionReducer(
      initState,
      {
        type: SessionActions.LOGIN_USER_SUCCESS,
        payload: { token: 1234 }
      }
    );
    expect(nextState.isLoading).toBeFalsy;
    expect(nextState.hasError).toBeFalsy;
    expect(nextState.token).toEqual(1234);
  });

  it('should flag an error on LOGIN_USER_ERROR', () => {
    const nextState = sessionReducer(
      initState,
      { type: SessionActions.LOGIN_USER_ERROR });
    expect(nextState.isLoading).toBeFalsy;
    expect(nextState.hasError).toBeTruthy;
  });

  it('should clear user data on LOGOUT_USER', () => {
    const nextState = sessionReducer(
      initState,
      { type: SessionActions.LOGOUT_USER });
    expect(nextState.isLoading).toBeTruthy;
    expect(nextState.hasError).toBeFalsy;
    expect(nextState.token).toEqual(null);
  });
});
