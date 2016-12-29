/**
 * Created by talgvili on 26/12/2016.
 */

import { NgModule } from '@angular/core';
import {UserDisplayComponent} from "./user-display.component";
import {UsersView} from "./users-view/users-view.component";
import {SharedModule} from "../shared.module";


@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        UserDisplayComponent,
        UsersView
    ],
    providers: [],
    exports: [UserDisplayComponent]
})
export class UsersDisplayModule {}