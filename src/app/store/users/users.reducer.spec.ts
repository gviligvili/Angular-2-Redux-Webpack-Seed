/**
 * Created by talgvili on 24/12/2016.
 */
/**
 *  Please don't forget, it's a reducer test.
 *  HE SHOULDN'T KNOW ANYTHING ABOUT ANGULAR.
 *  only about recreating states.
 */
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
    });


    it('should add user on SET_USER', () => {
        // Set up
        const user = usersMock[0]
        const expected = Object.assign({}, initState, {users: {[user.id]: user}});

        // Action
        const nextState = usersReducer(
            initState,
            {
                type: UsersActions.SET_USER,
                payload: {user: user}
            });

        /**
         * IT'S IMPORTANT TO CHECK THAT THE LAST STATE AND THE NEW ONE DONT HAVE THE SAME POINTER !
         * SAME FOR CHANGED SUBOBJECTS ! (Like Users).
         * ITS VERY IMPORTANT !!!
         */
        expect(initState === nextState).toBeFalsy();
        expect(initState.users === nextState.users).toBeFalsy();
        expect(nextState).toEqual(expected);
    });

    it('should override user on SET_USER', () => {
        // Set up
        const user = usersMock[0];
        const olduser = usersMock[1];

        const previousState = Object.assign({}, initState, {users: {[user.id]: olduser}});
        const expected = Object.assign({}, initState, {users: {[user.id]: user}});

        // Action
        const nextState = usersReducer(
            previousState,
            {
                type: UsersActions.SET_USER,
                payload: {user: user}
            });


        /**
         * IT'S IMPORTANT TO CHECK THAT THE LAST STATE AND THE NEW ONE DONT HAVE THE SAME POINTER !
         * SAME FOR CHANGED SUBOBJECTS ! (Like Users).
         * ITS VERY IMPORTANT !!!
         */
        // Tests
        expect(previousState === nextState).toBeFalsy()
        expect(previousState.users === nextState.users).toBeFalsy()
        expect(nextState).toEqual(expected);
    });

    it('should add users on SET_USERS', () => {
        // Set up
        let usersDict = _.keyBy(usersMock, "id")


        // Action
        const nextState = usersReducer(
            initState,
            {
                type: UsersActions.SET_USERS,
                payload: {users: usersDict}
            });


        // Tests
        expect(initState === nextState).toBeFalsy()
        expect(initState.users === nextState.users).toBeFalsy()
        expect(nextState.users).toEqual(usersDict);
    });

    it('should MERGE & OVERRIDE users on SET_USERS', () => {
        // Set up
        let usersDict = _.keyBy(usersMock, "id");
        const previousState = Object.assign({}, initState, {users: usersDict});
        let override = {
            "id": 4,
            "name": "JOJO"
        };
        let added = {
            "id": 5,
            "name": "LALA"
        }
        const expected = Object.assign({}, initState, {
            users: {
                1: {
                    "id": 1,
                    "name": "Tal"
                },
                2: {
                    "id": 2,
                    "name": "Abe"
                },
                3: {
                    "id": 3,
                    "name": "Fred"
                },
                4: {
                    "id": 4,
                    "name": "JOJO"
                },
                5: {
                    "id": 5,
                    "name": "LALA"
                }
            }
        })


        // Action
        const nextState = usersReducer(
            previousState,
            {
                type: UsersActions.SET_USERS,
                payload: {
                    users: {
                        [override.id]: override,
                        [added.id]: added
                    }
                }
            });

        // Test
        expect(initState === previousState).toBeFalsy()
        expect(initState.users === previousState.users).toBeFalsy()
        expect(nextState).toEqual(expected);
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
         * We check that the state is a fresh new object and do not point to the old state !
         * ITS VERY IMPORTANT !!!
         */
        expect(nextState === initState).toBeFalsy()
        expect(nextState.users).toEqual(usersDict);
    });

    it('should MERGE & OVERRIDE users on ArticlesActions FETCH_ARTICLES_SUCCESS', () => {
        // Set up
        let usersDict = _.keyBy(usersMock, "id");
        const previousState = Object.assign({}, initState, {users: usersDict});
        let override = {
            "id": 4,
            "name": "JOJO"
        };
        let added = {
            "id": 5,
            "name": "LALA"
        }
        const expected = Object.assign({}, initState, {
            users: {
                1: {
                    "id": 1,
                    "name": "Tal"
                },
                2: {
                    "id": 2,
                    "name": "Abe"
                },
                3: {
                    "id": 3,
                    "name": "Fred"
                },
                4: {
                    "id": 4,
                    "name": "JOJO"
                },
                5: {
                    "id": 5,
                    "name": "LALA"
                }
            }
        })


        // Action
        const nextState = usersReducer(
            previousState,
            {
                type: ArticlesActions.FETCH_ARTICLES_SUCCESS,
                payload: {
                    users: {
                        [override.id]: override,
                        [added.id]: added
                    }
                }
            });

        // Test
        expect(initState === previousState).toBeFalsy()
        expect(initState.users === previousState.users).toBeFalsy()
        expect(nextState).toEqual(expected);
    });

    it('should add users on ArticlesActions SET_ARTICLE', () => {
        let usersDict = _.keyBy(usersMock, "id")

        const nextState = usersReducer(
            initState,
            {
                type: ArticlesActions.SET_ARTICLE,
                payload: {users: usersDict}
            });

        /**
         * We check that the state is a fresh new object and do not point to the old state !
         * ITS VERY IMPORTANT !!!
         */
        expect(nextState === initState).toBeFalsy()
        expect(nextState.users).toEqual(usersDict);
    });

    it('should MERGE & OVERRIDE users on ArticlesActions SET_ARTICLE', () => {
        // Set up
        let usersDict = _.keyBy(usersMock, "id");
        const previousState = Object.assign({}, initState, {users: usersDict});
        let override = {
            "id": 4,
            "name": "JOJO"
        };
        let added = {
            "id": 5,
            "name": "LALA"
        }
        const expected = Object.assign({}, initState, {
            users: {
                1: {
                    "id": 1,
                    "name": "Tal"
                },
                2: {
                    "id": 2,
                    "name": "Abe"
                },
                3: {
                    "id": 3,
                    "name": "Fred"
                },
                4: {
                    "id": 4,
                    "name": "JOJO"
                },
                5: {
                    "id": 5,
                    "name": "LALA"
                }
            }
        })


        // Action
        const nextState = usersReducer(
            previousState,
            {
                type: ArticlesActions.SET_ARTICLE,
                payload: {
                    users: {
                        [override.id]: override,
                        [added.id]: added
                    }
                }
            });

        // Test
        expect(initState === previousState).toBeFalsy()
        expect(initState.users === previousState.users).toBeFalsy()
        expect(nextState).toEqual(expected);
    });
});
