/**
 * Created by talgvili on 24/12/2016.
 */
import {Component, Input, OnInit, OnChanges, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'articles-view',
    templateUrl: 'articles-view.component.html',
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
        console.log("articles-view changed to", this.articles);
    }
}