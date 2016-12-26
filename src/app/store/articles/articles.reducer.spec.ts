/**
 * Created by talgvili on 24/12/2016.
 */
/**
 *  Please don't forget, it's a reducer test.
 *  HE SHOULDN'T KNOW ANYTHING ABOUT ANGULAR.
 *  only about recreating states.
 */
import Immutable from 'immutable'
import { Iterable } from 'immutable'


import {articlesReducer} from './articles.reducer';
import {ArticlesActions} from "../../actions/articlesActions/articles.actions";
import {ARTICLES_INITIAL_STATE} from "./articles.initial-state";

let articlesMock = [{
    "id": 1,
    "title": "Some Article",
    "author": {
        "id": 7,
        "name": "Dan"
    },
    "contributors": [
        {
            "id": 10,
            "name": "Abe"
        },
        {
            "id": 15,
            "name": "Fred"
        }
    ]
},
    {
        "id": 2,
        "title": "Some Article",
        "author": {
            "id": 10,
            "name": "Abe"
        },
        "contributors": [
            {
                "id": 4,
                "name": "Tal"
            },
            {
                "id": 15,
                "name": "Fred"
            }
        ]
    }
]

describe('articles reducer', () => {
    let initState;

    beforeEach(() => {
        // sending an undefined, so the default value would be the initial state (in the reducer function there is a default)
        // sending unknown type, so it would just get me the state, (the default in switch case).
        initState = articlesReducer(undefined, {type: 'TEST_INIT '});
    });

    it('should have an initial state', () => {

        // Test
        expect(initState).toBe(ARTICLES_INITIAL_STATE);

        /**
         * We use Iterable to check that the state is Immutable !
         * ITS VERY IMPORTANT !!!
         */
        expect(Iterable.isIterable(initState)).toBeTruthy()
    });

    it('should add article on SET_ARTICLE', () => {
        // Set up
        const article = articlesMock[0]

        // Action
        const nextState = articlesReducer(
            initState,
            {
                type: ArticlesActions.SET_ARTICLE,
                payload: { article: article }
            });


        /**
         * We use Iterable to check that the state is Immutable !
         * ITS VERY IMPORTANT !!!
         */

        // Test
        expect(Iterable.isIterable(nextState)).toBeTruthy()
        expect(nextState.get("articles").toJS()).toEqual({
            1 : article
        });
    });

    it('should remove an article on REMOVE_ARTICLE', () => {
        // Set up
        const previousState = initState.mergeIn(["articles"], { 1: articlesMock[0], 2: articlesMock[1]})

        // Action
        const nextState = articlesReducer(
            previousState,
            {
                type: ArticlesActions.REMOVE_ARTICLE,
                payload: {
                    id: 1
                }

            });


        // Test
        expect(Iterable.isIterable(nextState)).toBeTruthy()
        expect(nextState.toJS()).toEqual(initState.mergeIn(["articles"], {  2: articlesMock[1]}).toJS());
    });

    it('should be in pending status on FETCH_ARTICLES_REQUEST', () => {

        // Action
        const nextState = articlesReducer(
            initState,
            {
                type: ArticlesActions.FETCH_ARTICLES_REQUEST,
            });


        // Test
        expect(Iterable.isIterable(nextState)).toBeTruthy()
        expect(nextState.get("pending")).toBeTruthy()
        expect(nextState.get("error")).toBeFalsy()
    })

    it('should make pending status - false , apply articles on FETCH_ARTICLES_SUCCEED', () => {

        // Set up

        // a state which a request was sent. and the state is pending.
        let pendingState = initState.set("pending", true)


        // Action
        const nextState = articlesReducer(
            pendingState,
            {
                type: ArticlesActions.FETCH_ARTICLES_SUCCESS,
                payload: { articles : articlesMock }
            });


        // Test
        expect(Iterable.isIterable(nextState)).toBeTruthy()
        expect(nextState.get("pending")).toBeFalsy()
        expect(nextState.get("error")).toBeFalsy()
        expect(nextState.get("articles").toJS()).toEqual(articlesMock)
    });

    it('should make pending status - false , apply error on FETCH_ARTICLES_FAILURE', () => {
        // Set up

        // a state which a request was sent. and the state is pending.
        let pendingState = initState.set("pending", true)
        let error = new Error("Damn Error")

        // Action
        const nextState = articlesReducer(
            pendingState,
            {
                type: ArticlesActions.FETCH_ARTICLES_FAILURE,
                payload: { error : error }
            });

        // Test
        expect(Iterable.isIterable(nextState)).toBeTruthy()
        expect(nextState.get("pending")).toBeFalsy()
        expect(nextState.get("error")).toEqual(error)
    });
});
