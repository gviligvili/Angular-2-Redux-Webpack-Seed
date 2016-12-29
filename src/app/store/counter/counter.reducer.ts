import { Action } from 'redux';
import { CounterActions } from '../../actions/counterActions/counter.actions';
import { INITIAL_STATE } from './counter.initial-state';
import { ICounter } from './counter.types';

export function counterReducer(state: ICounter = INITIAL_STATE, action: Action): ICounter {

  switch (action.type) {

  case CounterActions.INCREMENT_COUNTER:
    return Object.assign({}, state, { counter: state.counter+1})

  case CounterActions.DECREMENT_COUNTER:
    return Object.assign({}, state, { counter: state.counter-1})

  default:
    return state;
  }
}
