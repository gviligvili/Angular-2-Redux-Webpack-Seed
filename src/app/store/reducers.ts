/**
 * Created by talgvili on 20/12/2016.
 */
import {combineReducers} from 'redux';
import { counterReducer } from './counter/counter.reducer';
import {IAppState} from "./store";
import {articlesReducer} from "./articles/articles.reducer";
import {usersReducer} from "./users/users.reducer";
import undoable from 'redux-undo';
import {CounterActions} from "../actions/counterActions/counter.actions";

export default combineReducers<IAppState>({
    counter: undoable(counterReducer , {
        undoType: CounterActions.UNDO_COUNTER, // define a custom action type for this undo action
        redoType: CounterActions.REDO_COUNTER, // define a custom action type for this redo action
    }),
    articlesReducer: articlesReducer,
    usersReducer: usersReducer,
});
