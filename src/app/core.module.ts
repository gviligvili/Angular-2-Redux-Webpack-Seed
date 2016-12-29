/**
 * Created by talgvili on 29/12/2016.
 */
import {NgModule}       from '@angular/core';
import {CommonModule}      from '@angular/common';
import {UserService}       from './user.service';
import {CounterActions} from "./actions/counterActions/counter.actions";
import {UsersActions} from "./actions/usersActions/users.actions";
import {ArticlesActions} from "./actions/articlesActions/articles.actions";
import {NgRedux, DevToolsExtension, NgReduxModule} from "ng2-redux/lib/index";
import {UsersDisplayModule} from "./modules/userDisplay/user-display.module";
import {ArticlesModule} from "./modules/articles/articles.module";


const FEATURE_MODULES = [
    ArticlesModule,
    UsersDisplayModule
]



@NgModule({
    imports: [
        CommonModule,
        NgReduxModule,
        ...FEATURE_MODULES
    ],
    declarations: [

    ],
    exports: [],
    providers: [
        DevToolsExtension,
        NgRedux,
        CounterActions,
        UsersActions,
        ArticlesActions
    ]
})
export class CoreModule {}