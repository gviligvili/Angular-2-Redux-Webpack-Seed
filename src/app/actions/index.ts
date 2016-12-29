import { Action } from 'redux';
import { CounterActions } from './counterActions/counter.actions';
import {UsersActions} from './usersActions/users.actions'
import {ArticlesActions} from './articlesActions/articles.actions'

export interface IPayloadAction extends Action {
  payload?: any;
}

export const ACTION_PROVIDERS = [ CounterActions, UsersActions, ArticlesActions ];
