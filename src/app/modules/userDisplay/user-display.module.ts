/**
 * Created by talgvili on 26/12/2016.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgRedux} from "ng2-redux/lib/index";
import {UserDisplayComponent} from "./user-display.component";
import {UsersView} from "./users-view/users-view.component";
import {ReactiveFormsModule} from "@angular/forms";
import {UsersActions} from "../../actions/usersActions/users.actions";
import {ArticlesModule} from "../articles/articles.module";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ArticlesModule
    ],
    declarations: [
        UserDisplayComponent,
        UsersView
    ],
    providers: [
        NgRedux,
        UsersActions
    ],
    exports: [UserDisplayComponent]
})
export class UsersDisplayModule {}