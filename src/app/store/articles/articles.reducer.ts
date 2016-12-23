/**
 * Created by talgvili on 22/12/2016.
 */
import { Action } from 'redux';
import { ArticlesActions } from '../../actions/articlesActions/articles.actions'
const INITIAL_STATE = {
    pending: false
}

export function articlesReducer(state:any = INITIAL_STATE, action: Action): any {

    switch (action.type) {

        case ArticlesActions.FETCH_ARTICLES_REQUEST:
            return Object.assign({}, state, { pending: true})

        case ArticlesActions.FETCH_ARTICLES_SUCCESS:
            return Object.assign({}, state, { pending: false})

        case ArticlesActions.FETCH_ARTICLES_FAILURE:
            return Object.assign({}, state, { pending: false})
        default:
            return state;
    }
}
