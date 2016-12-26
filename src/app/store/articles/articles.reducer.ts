/**
 * Created by talgvili on 22/12/2016.
 */
import { ArticlesActions } from '../../actions/articlesActions/articles.actions'
import {IPayloadAction} from "../../actions";
import {ARTICLES_INITIAL_STATE} from "./articles.initial-state";

export function articlesReducer(state = ARTICLES_INITIAL_STATE, action: IPayloadAction): any {

    switch (action.type) {
        case ArticlesActions.FETCH_ARTICLES_REQUEST:
            return state.merge({pending: true, error: false})

        case ArticlesActions.FETCH_ARTICLES_SUCCESS:
            return state.merge({ articles: action.payload.articles, pending: false, error: false})

        case ArticlesActions.FETCH_ARTICLES_FAILURE:
            return state.merge({ error: action.payload.error, pending: false})

        case ArticlesActions.SET_ARTICLE:
            return state.setIn(["articles", action.payload.article.id], action.payload.article)

        case ArticlesActions.REMOVE_ARTICLE:
            return state.deleteIn(["articles", String(action.payload.id)])

        default:
            return state;
    }
}