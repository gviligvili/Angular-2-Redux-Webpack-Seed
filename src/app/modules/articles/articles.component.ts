/**
 * Created by talgvili on 22/12/2016.
 */
"use strict;"
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ArticlesActions} from "../../actions/articlesActions/articles.actions";
import {Observable} from "rxjs/Rx";
import {select} from "ng2-redux";

@Component({
    template: `
    <p>@@@@@@@@@ Articles @@@@@@@</p>
    <articles-view [articles]="articles"></articles-view>
  `})
export class ArticlesComponent implements OnInit {
    private articles:Array<any>
    private error;
    private pending;
    private harta;

    /**
     * instead of the @select decorator, you can :
     *     this.articles = this.ngRedux.select('articles');
     */
    @select(state =>  state.articles) private articlesReducer$: Observable<any>;


    constructor(private articlesActions:ArticlesActions) {
        console.log("Articles componen on construct");
        this.articlesReducer$.subscribe((data) => {
            console.error("Articles reducer subscribition ! articles", data.toJS());

            let dataObj = data.toJS();
            this.articles = _.values(dataObj.articles);
            this.error = dataObj.error;
            this.pending = dataObj.pending;

            if(!this.harta){
                this.harta = data
            } else {
                if (this.harta !== data) {
                    console.error("Articles reducer changed !");
                } else {
                    console.error("Update for nothing");
                }
            }
        })
    }

    ngOnInit() {
        console.log("Articles componen on Init");
        this.articlesActions.fetchArticles();
    }
}