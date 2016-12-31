/**
 * Created by talgvili on 25/12/2016.
 */

import {IPayloadAction} from "../../actions";
import {USERS_INITIAL_STATE} from "./users.initial-state";
import {UsersActions} from "../../actions/usersActions/users.actions";
import {ArticlesActions} from "../../actions/articlesActions/articles.actions";

export function usersReducer(state = USERS_INITIAL_STATE, action: IPayloadAction): any {

    switch (action.type) {


        case UsersActions.SET_USER:
            return Object.assign(
                {},
                state,
                {
                    users: Object.assign({}, state.users, { [action.payload.user.id] : action.payload.user })
                });



        case UsersActions.SET_USERS:
        case ArticlesActions.FETCH_ARTICLES_SUCCESS:
        case ArticlesActions.SET_ARTICLE:
            return Object.assign(
                {},
                state,
                {
                    users: Object.assign({}, state.users, action.payload.users)
                });

        default:
            return state;
    }
}
