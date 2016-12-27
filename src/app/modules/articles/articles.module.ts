/**
 * Created by talgvili on 22/12/2016.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgRedux} from "ng2-redux/lib/index";
import {ArticlesComponent} from "./articles.component";
import {ArticlesActions} from "../../actions/articlesActions/articles.actions";
import {ArticlesView} from "./components/articles-view/articles-view.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ArticleBox} from "./components/article-box/article-box.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        ArticlesComponent,
        ArticlesView,
        ArticleBox
    ],
    providers: [
        NgRedux,
        ArticlesActions
    ],
    exports: [ArticlesComponent]
})
export class ArticlesModule {
}