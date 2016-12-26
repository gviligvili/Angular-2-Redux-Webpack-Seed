import { counterReducer } from './counter.reducer';
import { CounterActions, SessionActions } from '../../actions';
import { ICounter } from './counter.types';
import { INITIAL_STATE } from './counter.initial-state'
describe('counter reducer', () => {
  let initState: ICounter;

  beforeEach(() => {
    initState = counterReducer(undefined, { type: 'TEST_INIT '});
  });

  it('should have an initial state', () => {
    expect(initState).toBe(INITIAL_STATE);
  });

  it('should increment state.count on INCREMENT_COUNTER', () => {
    const previousValue = initState.counter;
    const nextState = counterReducer(
      initState,
      { type: CounterActions.INCREMENT_COUNTER });
    expect(nextState.counter).toEqual(1);
  });

  it('should decrement state.count on DECREMENT_COUNTER', () => {
    const previousValue = initState.counter;
    const nextState = counterReducer(
      initState,
      { type: CounterActions.DECREMENT_COUNTER });
    expect(nextState.counter).toEqual(previousValue - 1);
  });

  it('should clear the counter on LOGOUT_USER', () => {
    const nextState = counterReducer(
      initState,
      { type: SessionActions.LOGOUT_USER });
    expect(nextState).toBe(INITIAL_STATE);
  });
});
