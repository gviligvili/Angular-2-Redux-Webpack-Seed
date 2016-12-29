import * as counter from './counter';
import appReducers from './reducers'
import {compose, Reducer} from "redux";

export interface IAppState {
  counter?: counter.ICounter;
  articlesReducer?: any,
  usersReducer?: any
};



/**
 *
 *  In --Development-- mode, we would like to use the HMR.
 *  HMR needs to reload all of our state, there for this function
 *  is responsible to apply the store (it creates a root reducer).
 */
// Generate a reducer to set the root state
function stateSetter(reducer:Reducer<any>):Reducer<any> {
  return function (state, action) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload
    }
    return reducer(state, action)
  }
}


let reducerHolder;
if (ENV === "development") {
  reducerHolder = stateSetter(appReducers)

} else {
  reducerHolder = appReducers
}

const rootReducer = reducerHolder


export {rootReducer}



