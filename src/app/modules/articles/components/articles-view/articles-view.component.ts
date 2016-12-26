/**
 * Created by talgvili on 24/12/2016.
 */
import {Component, Input, OnInit, OnChanges, ChangeDetectionStrategy} from '@angular/core';
var bows = require("bows")
var blog = bows("article-view changed !", "with params ?")

@Component({
    selector: 'articles-view',
    templateUrl: 'articles-view.component.html',
    styleUrls: ['./articles-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesView implements OnInit, OnChanges{
    @Input() articles:any;
    @Input() error:any;
    @Input() pending:any;

    ngOnInit() {
        console.log("articles-view Initialized with ", this.articles);
    }

    ngOnChanges() {
        blog(this.articles, "pending? ", this.pending, "error? ", this.error);
    }
}