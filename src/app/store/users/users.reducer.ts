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

            /** The reason I do string converstion, is because the key must be a string ! safety measure.*/
            return state.setIn(["users", String(action.payload.user.id)], action.payload.user)

        case UsersActions.SET_USERS:
        case ArticlesActions.FETCH_ARTICLES_SUCCESS:
        case ArticlesActions.SET_ARTICLE:
            return state.mergeIn(["users"], action.payload.users)
        default:
            return state;
    }
}
