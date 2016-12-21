import { IAppState, rootReducer, deimmutify, reimmutify } from './store';
import { ICounter } from './counter';
import { ISession } from './session';

const createLogger = require('redux-logger');

export {
  IAppState,
  ISession,
  ICounter,
  rootReducer,
  reimmutify,
};

export let middleware = [];
export let enhancers = [];

if (ENV === "development") {
  middleware.push(
    createLogger({
    level: 'info',
    collapsed: true,
    stateTransformer: deimmutify,
  }));
}


