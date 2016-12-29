/**
 * Created by talgvili on 22/12/2016.
 */
import {NgModule} from '@angular/core';
import {ArticlesComponent} from "./articles.component";
import {ArticlesView} from "./components/articles-view/articles-view.component";
import {ArticleBox} from "./components/article-box/article-box.component";
import {SharedModule} from "../shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        ArticlesComponent,
        ArticlesView,
        ArticleBox
    ],
    providers: [],
    exports: [ArticlesComponent]
})
export class ArticlesModule {
}