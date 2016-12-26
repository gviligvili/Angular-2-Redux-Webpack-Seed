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
        // Our normalizer wont do much because there isnt so much info in our "userSchema",
        // but its right practice to normalize your data
        let normalizedUser = normalize(newUser, userSchema)
        let user = _.values(normalizedUser.entities.user)[0];
        this.ngRedux.dispatch({ type: UsersActions.ADD_USER, payload: { user }})
    }
}
