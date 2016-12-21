/**
 * Created by talgvili on 20/12/2016.
 */
import {combineReducers} from 'redux';
import { counterReducer } from './counter/counter.reducer';
import { sessionReducer } from './session/session.reducer';
import {IAppState} from "./store";

export default combineReducers<IAppState>({
    counter: counterReducer,
    session: sessionReducer
});
