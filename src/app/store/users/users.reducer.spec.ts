/**
 * Created by talgvili on 24/12/2016.
 */
/**
 *  Please don't forget, it's a reducer test.
 *  HE SHOULDN'T KNOW ANYTHING ABOUT ANGULAR.
 *  only about recreating states.
 */
import Immutable from 'immutable'
import {Iterable} from 'immutable'
import {USERS_INITIAL_STATE} from "./users.initial-state";
import {usersReducer} from "./users.reducer";
import {UsersActions} from "../../actions/usersActions/users.actions"
import {ArticlesActions} from "../../actions/articlesActions/articles.actions";

let usersMock = [
    {
        "id": 1,
        "name": "Tal"
    },
    {
        "id": 2,
        "name": "Abe"
    },
    {
        "id": 3,
        "name": "Fred"
    },
    {
        "id": 4,
        "name": "Dan"
    },
]

describe('users reducer', () => {
    let initState;

    beforeEach(() => {
        // sending an undefined, so the default value would be the initial state (in the reducer function there is a default)
        // sending unknown type, so it would just get me the state, (the default in switch case).
        initState = usersReducer(undefined, {type: 'TEST_INIT '});
    });

    it('should have an initial state', () => {

        // Test
        expect(initState).toBe(USERS_INITIAL_STATE);

        /**
         * We use Iterable to check that the state is Immutable !
         * ITS VERY IMPORTANT !!!
         */
        expect(Iterable.isIterable(initState)).toBeTruthy()
    });


    it('should add user on SET_USER', () => {
        // Set up
        const user = usersMock[0]

        // Action
        const nextState = usersReducer(
            initState,
            {
                type: UsersActions.SET_USER,
                payload: {user: user}
            });

        /**
         * We use Iterable to check that the state is Immutable !
         * ITS VERY IMPORTANT !!!
         */
        expect(Iterable.isIterable(nextState)).toBeTruthy()
        expect(nextState.get("users").toJS()).toEqual({
            [user.id]: user
        });
    });

    it('should add users on SET_USERS', () => {
        let usersDict = _.keyBy(usersMock, "id")

        const nextState = usersReducer(
            initState,
            {
                type: UsersActions.SET_USERS,
                payload: {users: usersDict}
            });

        /**
         * We use Iterable to check that the state is Immutable !
         * ITS VERY IMPORTANT !!!
         */
        expect(Iterable.isIterable(nextState)).toBeTruthy()
        expect(nextState.get("users").toJS()).toEqual(usersDict);
    });

    it('should add users on ArticlesActions FETCH_ARTICLES_SUCCESS', () => {
        let usersDict = _.keyBy(usersMock, "id")

        const nextState = usersReducer(
            initState,
            {
                type: ArticlesActions.FETCH_ARTICLES_SUCCESS,
                payload: {users: usersDict}
            });

        /**
         * We use Iterable to check that the state is Immutable !
         * ITS VERY IMPORTANT !!!
         */
        expect(Iterable.isIterable(nextState)).toBeTruthy()
        expect(nextState.get("users").toJS()).toEqual(usersDict);
    });
});
