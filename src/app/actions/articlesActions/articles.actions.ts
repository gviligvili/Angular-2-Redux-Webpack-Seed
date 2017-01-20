import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/store';
import {Http, Response} from "@angular/http";
import {normalize, denormalize} from 'normalizr'
import {articleSchema} from "../../store/schemas";


@Injectable()
export class ArticlesActions {

    /**
     *  no payload.
     */
    static FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';

    /**
     *  payload: {
     *      articles :  a Article object (In a {key:value} format - { 1: article, 23 : article } .
     *      users :  a Users object (In a {key:value} format - { 1: user, 7 : user } .
     *  }
     */
    static FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';

    /**
     *  payload: {
     *      error :  an error message. (String)
     *  }
     */
    static FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

    /**
     *  payload: {
     *      article: :  {key:value} article object - { 324 : article }
     *      users :  a Users object (In a {key:value} format - { 1: user, 7 : user } .
     *  }
     */
    static SET_ARTICLE = "SET_ARTICLE"

    /**
     *  payload: {
     *      id: :  number - id of the article
     *  }
     */
    static REMOVE_ARTICLE = "REMOVE_ARTICLE"

    constructor(private ngRedux: NgRedux<IAppState>, private http: Http) {}




    fetchArticles() {
        this.ngRedux.dispatch({ type: ArticlesActions.FETCH_ARTICLES_REQUEST });

        return this.http.get('http://localhost:1337/articles')
            .subscribe(
                this._fetchSuccesful.bind(this),
                this._fetchError.bind(this),
                () => { 
                    console.log("Articles Request subscription is done.");
                }
            )
    }

    addArticle(newArticle) {
        let normalizedArticle = normalize(newArticle, articleSchema)
        let article = normalizedArticle.entities.articles
        let users = normalizedArticle.entities.users
        this.ngRedux.dispatch({ type: ArticlesActions.SET_ARTICLE, payload: { article , users}})
    }

    removeArticle(id: number) {
        // The reason that we dont use normalize here, and delete every user connected to the article
        // is because there may be other article relaying on those users, so we delete only the articles.
        // don't worry that the extra users are laying there.
        this.ngRedux.dispatch({ type: ArticlesActions.REMOVE_ARTICLE, payload: { id }})
    }

    /**
     * The state is normalized, here we will denormalize and retrieve the full
     * article object and all  his nested entities will be populated.
     * @param ids - Array of articles ids
     */
    denormalizeArticles(ids){
        console.time("Denormalize")
        let state = this.ngRedux.getState()
        let articleReducer = state.articlesReducer;
        let usersReducer = state.usersReducer;

        // Extracting the data we need from the article.
        // they are all normalized !
        let allNormalizedArticles = articleReducer.articles;
        let relevantNormalizedArticles = ids.map(id => {
            if (!allNormalizedArticles[id]) throw new Error("Request to denormalize article id :" + id + " has failed because he doesn't exist.")
            return allNormalizedArticles[id]
        })
        let normalizedUsers = usersReducer.users

        // so now we denormalize.
        let entities = {
            articles: relevantNormalizedArticles,
            users: normalizedUsers
        }


        var d =  denormalize(relevantNormalizedArticles, [articleSchema] ,entities);
        console.timeEnd("Denormalize")
        return d;
    }
    
    // private Function
    
    _fetchSuccesful(res: Response){
        let articlesData = res.json()
        // Normalizing our data, and dispatching to for everyone who needs to know (in this case, user service
        // should dispatch to the store the received contributors and authors (because they are a user models).
        let normalizedAnswer = normalize(articlesData, [articleSchema]);

        // All the articles normalized data
        let articles = normalizedAnswer.entities.articles;
        let users = normalizedAnswer.entities.users;

        this.ngRedux.dispatch({
            type: ArticlesActions.FETCH_ARTICLES_SUCCESS,
            payload: {
                articles,
                users
            }
        });

        // Remember we turned the observable into
        // a promise, return the articles.
        return articles
    }
    
    _fetchError(err){
        let message = err.message || "Error fetching articles"
        this.ngRedux.dispatch({ type: ArticlesActions.FETCH_ARTICLES_FAILURE, payload: { error: message } });
        console.error("Error fetching articles")
    }
}
