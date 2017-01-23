/**
 * Created by talgvili on 29/12/2016.
 */
import {NgModule}       from '@angular/core';
import {CommonModule}      from '@angular/common';
import {CounterActions} from "./actions/counterActions/counter.actions";
import {UsersActions} from "./actions/usersActions/users.actions";
import {ArticlesActions} from "./actions/articlesActions/articles.actions";
import {DevToolsExtension, NgReduxModule} from "ng2-redux/lib/index";
import {UsersDisplayModule} from "./modules/userDisplay/user-display.module";
import {ArticlesModule} from "./modules/articles/articles.module";


const FEATURE_MODULES = [
    ArticlesModule,
    UsersDisplayModule
]

const APP_SERVICE = [
    CounterActions,
    UsersActions,
    ArticlesActions
]


@NgModule({
    imports: [
        CommonModule,
        NgReduxModule,
    ],
    declarations: [

    ],
    exports: [
        ...FEATURE_MODULES
    ],
    providers: [
        DevToolsExtension,
        ...APP_SERVICE
    ]
})
export class CoreModule {}