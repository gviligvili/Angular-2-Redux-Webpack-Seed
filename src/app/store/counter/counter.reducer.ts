import { Action } from 'redux';
import { CounterActions } from '../../actions/counter.actions';
import { SessionActions } from '../../actions/session.actions';
import { INITIAL_STATE } from './counter.initial-state';
import { ICounter } from './counter.types';

export function counterReducer(state: ICounter = INITIAL_STATE, action: Action): ICounter {

  switch (action.type) {

  case CounterActions.INCREMENT_COUNTER:
    return Object.assign({}, state, { counter: state.counter+1})

  case CounterActions.DECREMENT_COUNTER:
    return Object.assign({}, state, { counter: state.counter-1})

  case SessionActions.LOGOUT_USER:
    return INITIAL_STATE;

  default:
    return state;
  }
}
