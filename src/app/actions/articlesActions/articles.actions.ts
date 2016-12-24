import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/store';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {normalize} from 'normalizr'
import {articleSchema} from "../../store/schemas/article.schema";


@Injectable()
export class ArticlesActions {
    static FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
    static FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
    static FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';
    static ADD_ARTICLE = "ADD_ARTICLE"
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
                let articles = normalize(articlesData, articleSchema)
                this.ngRedux.dispatch({ type: ArticlesActions.FETCH_ARTICLES_SUCCESS, payload: { articles } });
                return articles
            })
            .catch((err) => {
                this.ngRedux.dispatch({ type: ArticlesActions.FETCH_ARTICLES_FAILURE, payload: { error: err.message } });
                console.error("Error fetching articles")
                return err
            })
    }

    addArticle(newArticle) {
        let article = normalize(newArticle, articleSchema)
        this.ngRedux.dispatch({ type: ArticlesActions.ADD_ARTICLE, payload: { article }})
    }

    removeArticle(id: number) {
        // The reason that we dont use normalize here, and delete every user connected to the article
        // is because there may be other article relaying on those users, so we delete only the articles.
        // don't worry that the extra users are laying there.
        this.ngRedux.dispatch({ type: ArticlesActions.REMOVE_ARTICLE, payload: { id: id }})
    }
}
