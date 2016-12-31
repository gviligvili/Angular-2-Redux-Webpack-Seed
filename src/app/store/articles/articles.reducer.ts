/**
 * Created by talgvili on 22/12/2016.
 */
import {ArticlesActions} from '../../actions/articlesActions/articles.actions'
import {IPayloadAction} from "../../actions";
import {ARTICLES_INITIAL_STATE} from "./articles.initial-state";

export function articlesReducer(state = ARTICLES_INITIAL_STATE, action:IPayloadAction):any {

    switch (action.type) {


        case ArticlesActions.FETCH_ARTICLES_REQUEST:
            return Object.assign(
                {},
                state,
                {
                    pending: true,
                    error: false
                })


        case ArticlesActions.FETCH_ARTICLES_SUCCESS:
            return Object.assign(
                {}, /** IMPORTANT ! , Because like that, Object.assign will use fresh new object. **/
                state,
                {
                    articles: Object.assign({}, state.articles, action.payload.articles),
                    /** Combine the previous articles, with the new articles, like that outdated articles will be overidden and others wont get deleted. **/
                    pending: false,
                    error: false
                });

        case ArticlesActions.FETCH_ARTICLES_FAILURE:
            return Object.assign({}, state, {error: action.payload.error, pending: false})


        case ArticlesActions.SET_ARTICLE:
            return Object.assign(
                {},
                state,
                {
                    articles: Object.assign({}, state.articles, action.payload.article)
                });



        case ArticlesActions.REMOVE_ARTICLE:
            /**
             *  Creating a new articles object ,
             *  and from him, deleting the id of the article.
             */
            let newArticles = Object.assign({}, state.articles)
            delete newArticles[action.payload.id];

            return Object.assign(
                {},
                state,
                {
                    articles: newArticles
                })


        default:
            return state;
    }
}
