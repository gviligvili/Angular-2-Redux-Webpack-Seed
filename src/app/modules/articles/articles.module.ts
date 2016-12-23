/**
 * Created by talgvili on 22/12/2016.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgRedux} from "ng2-redux/lib/index";
import {ArticlesComponent} from "./articles.component";
import {ArticlesActions} from "../../actions/articlesActions/articles.actions";

// import { CreditCardMaskPipe } from './credit-card-mask.pipe';
// import { CreditCardService } from './credit-card.service';
// import { CreditCardComponent } from './credit-card.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
        ArticlesComponent
    ],
    providers: [
        NgRedux,
        ArticlesActions
    ],
    exports: [ArticlesComponent]
})
export class ArticlesModule {}