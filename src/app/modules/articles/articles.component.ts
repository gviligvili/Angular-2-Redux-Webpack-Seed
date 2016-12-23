/**
 * Created by talgvili on 22/12/2016.
 */
import { Component, OnInit } from '@angular/core';
import {ArticlesActions} from "../../actions/articlesActions/articles.actions";

@Component({
    selector: 'selector',
    template: `
    <p>Articles @@@@@@@</p>
  `})
export class ArticlesComponent implements OnInit {
    constructor(private articlesActions: ArticlesActions) { }

    ngOnInit() {
        this.articlesActions.fetchArticles()
    }

}