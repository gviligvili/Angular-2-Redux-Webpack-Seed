/**
 * Created by talgvili on 22/12/2016.
 */
"use strict;"
import {Component, OnInit} from '@angular/core';
import {ArticlesActions} from "../../actions/articlesActions/articles.actions";
import {Observable, Subscription} from "rxjs/Rx";
import {select, NgRedux} from "ng2-redux";
import {denormalize} from "denormalizr";

var bows = require("bows")
var articlesReducerChangedLog = bows("Articles Reducer Changed !")
var usersReducerChangedLog = bows("Users Reducer Changed !")
var refreshingDataLog = bows("Refreshing Articles View Data !")


/**
 *   I would like to point out that this is a SMART component.
 *   This component is root of the module,
 *   and it's the ONLY ONE to manage the data or use redux actions !
 *   every other directive (like articles-view) is a dumb component,
 *   which only DISPLAY the data or dispatch events.
 */
@Component({
    selector: 'article-component',
    template: `
    <articles-view [articles]="articles" [error]="error" [pending]="pending" (articleSubmit)="onArticleSubmit($event)"></articles-view>
  `
})
export class ArticlesComponent implements OnInit {
    private articles:Array<any>
    private error;
    private pending;


    private articleSub:Subscription
    private userSub:Subscription

    /**
     * instead of the @select decorator, you can :
     *     this.articles = this.ngRedux.select('articles');
     */
    @select(state => state.articlesReducer) private articlesReducer$:Observable<any>;
    @select(state => state.usersReducer) private usersReducer$:Observable<any>;

    constructor(private articlesActions:ArticlesActions, private ngRedux:NgRedux<any>) {
        console.log("Articles componen on construct");

        this.articleSub = this.articlesReducer$.subscribe((data) => {
            articlesReducerChangedLog(data.toJS())
            this.refreshData()
        });

        this.userSub = this.usersReducer$.subscribe((data) => {
            usersReducerChangedLog(data.toJS())
            this.refreshData()
        })
    }


    /**
     * The reason for the common function is that we want to be updated only
     * when articles and users reducers are updated, not when the whole state is updated.
     * @param data
     */
    refreshData() {
        let state = this.ngRedux.getState()
        let articleReducer = state.articlesReducer.toJS();

        this.error = articleReducer.error;
        this.pending = articleReducer.pending;

        let normalizedArticles = articleReducer.articles;
        let relevantArticlesIDS = Object.keys(normalizedArticles)

        const articles = this.articlesActions.denormalizeArticles(relevantArticlesIDS);
        this.articles = _.values(articles);
        refreshingDataLog(this.articles);

    }

    ngOnInit() {
        this.articlesActions.fetchArticles();
    }


    /**
     * IMPORTANT !!!
     * ------------UNSUBSCRIBE THE SUBSCRIBERS --------
     */
    ngOnDestroy() {
        this.articleSub.unsubscribe()
        this.userSub.unsubscribe()
    }

    onArticleSubmit(article) {
        this.articlesActions.addArticle(article)
    }
}