/**
 * Created by talgvili on 27/12/2016.
 */
import {Component, OnInit, Input} from '@angular/core';
var bows = require("bows")
var articleBoxChangedLogger = bows("articleBox Changed")
@Component({
    selector: 'article-box',
    templateUrl: 'article-box.component.html',
    styleUrls: ["article-box.component.scss"]
})
export class ArticleBox implements OnInit {
    @Input() article;
    constructor() { }

    ngOnInit() { }

    ngOnChanges(){
        articleBoxChangedLogger("With params ", this.article)
    }
}