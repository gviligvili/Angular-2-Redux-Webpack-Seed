import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/store';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class ArticlesActions {
    static FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
    static FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
    static FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

    constructor(private ngRedux: NgRedux<IAppState>, private http: Http) {}

    fetchArticles() {
        this.ngRedux.dispatch({ type: ArticlesActions.FETCH_ARTICLES_REQUEST });

        // this.http.get('http://localhost:1337/articles').map((res: Response) => res.json()).subscribe(res => console.log("RES : IS ", res));

        return this.http.get('http://localhost:1337/articles')
            .toPromise()
            .then((res: Response) => {
                let articles = res.json()
                this.ngRedux.dispatch({ type: ArticlesActions.FETCH_ARTICLES_SUCCESS, payload: { articles } });
                return articles
            })
            .catch((err) => {
                this.ngRedux.dispatch({ type: ArticlesActions.FETCH_ARTICLES_FAILURE, payload: { error: err.message } });
                console.error("Error fetching articles")
                return err
            })
    }
}
