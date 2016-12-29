import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/store';
import {Http, Response} from "@angular/http";
import {normalize} from 'normalizr'
import {articleSchema, arrayOfArticlesSchema} from "../../store/schemas";
import { denormalize } from "denormalizr";


@Injectable()
export class ArticlesActions {
    static FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
    static FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
    static FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';
    static SET_ARTICLE = "SET_ARTICLE"
    static REMOVE_ARTICLE = "REMOVE_ARTICLE"

    constructor(private ngRedux: NgRedux<IAppState>, private http: Http) {}

    fetchArticles() {
        this.ngRedux.dispatch({ type: ArticlesActions.FETCH_ARTICLES_REQUEST });

        // this.http.get('http://localhost:1337/articles').map((res: Response) => res.json()).subscribe(res => console.log("RES : IS ", res));

        return this.http.get('http://localhost:1337/articles')
            .toPromise()
            .then((res: Response) => {
                let articlesData = res.json()

                // Normalizing our data, and dispatching to for everyone who needs to know (in this case, user service
                // should dispatch to the store the received contributors and authors (because they are a user models).
                let normalizedAnswer = normalize(articlesData, arrayOfArticlesSchema);

                // All the articles normalized data
                let articles = normalizedAnswer.entities.article;
                let users = normalizedAnswer.entities.user;

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
            })
            .catch((err) => {
                let message = err.message || "Error fetching articles"
                this.ngRedux.dispatch({ type: ArticlesActions.FETCH_ARTICLES_FAILURE, payload: { error: message } });
                console.error("Error fetching articles")
            })
    }

    addArticle(newArticle) {
        let normalizedArticle = normalize(newArticle, articleSchema)
        let article = _.values(normalizedArticle.entities.article)[0]
        let users = normalizedArticle.entities.user
        this.ngRedux.dispatch({ type: ArticlesActions.SET_ARTICLE, payload: { article , users}})
    }

    removeArticle(id: number) {
        // The reason that we dont use normalize here, and delete every user connected to the article
        // is because there may be other article relaying on those users, so we delete only the articles.
        // don't worry that the extra users are laying there.
        this.ngRedux.dispatch({ type: ArticlesActions.REMOVE_ARTICLE, payload: { id: id }})
    }

    /**
     * The state is normalized, here we will denormalize and retrieve the full
     * article object and all  his nested entities will be populated.
     * @param ids - Array of articles ids
     */
    denormalizeArticles(ids){
        let state = this.ngRedux.getState()
        let articleReducer = state.articlesReducer.toJS();
        let usersReducer = state.usersReducer.toJS()

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
            article: relevantNormalizedArticles,
            user: normalizedUsers
        }

        return denormalize(relevantNormalizedArticles, entities, arrayOfArticlesSchema);
    }
}
