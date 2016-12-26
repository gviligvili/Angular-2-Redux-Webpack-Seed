/**
 * Created by talgvili on 25/12/2016.
 */
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import {normalize} from 'normalizr'
import {userSchema, arrayOfUsersSchema} from "../../store/schemas/user.schema";


@Injectable()
export class UsersActions {
    static ADD_USER = "ADD_USER"
    static ADD_USERS = "ADD_USERS"

    constructor(private ngRedux: NgRedux<any>) {}

    addUser(newUser) {
        let user = normalize(newUser, userSchema)
        this.ngRedux.dispatch({ type: UsersActions.ADD_USER, payload: { user }})
    }

    addUsers(newUsers) {
        let users = normalize(newUsers, arrayOfUsersSchema)
        this.ngRedux.dispatch({ type: UsersActions.ADD_USERS, payload: { users }})
    }
}
