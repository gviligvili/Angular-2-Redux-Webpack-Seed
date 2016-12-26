/**
 * Created by talgvili on 26/12/2016.
 */
import { Component } from '@angular/core';
import {NgRedux, select} from "ng2-redux/lib/index";
import {Observable, Subscription} from "rxjs/Rx";
import {UsersActions} from "../../actions/usersActions/users.actions";

@Component({
    template: `<users-view [users]='users' (userSubmit)='userSubmited($event)'></users-view>
               <article-component></article-component>`
})
export class UserDisplayComponent {
    private users;
    private userSub:Subscription

    @select('usersReducer') private usersReducer$:Observable<any>
    @select('articlesReducer') private articlesReducer$:Observable<any>
    constructor(private ngRedux:NgRedux<any>, private usersActions:UsersActions) {
        this.userSub = this.usersReducer$.subscribe((usersReducer) => {
            this.users = _.values(usersReducer.toJS().users);
        })
    }

    userSubmited(newUser){
        this.usersActions.addUser(newUser)
    }

    /**
     * IMPORTANT !!!
     * ------------UNSUBSCRIBE THE SUBSCRIBERS --------
     */
    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}