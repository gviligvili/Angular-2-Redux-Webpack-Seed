/**
 * Created by talgvili on 24/12/2016.
 */

/**
 *  Please don't forget, it's a reducer test.
 *  HE SHOULDN'T KNOW ANYTHING ABOUT ANGULAR.
 *  only about recreating states.
 */
import {articlesReducer} from './articles.reducer';
import {ArticlesActions} from "../../actions/articlesActions/articles.actions";
import {ARTICLES_INITIAL_STATE} from "./articles.initial-state";
import {normalize} from 'normalizr'
import {articleSchema} from "../schemas/articles.schema";

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
    });

    it('should add article on SET_ARTICLE', () => {
        // Set up
        const article =  { [articlesMock[0].id] : articlesMock[0] }

        // Action
        const nextState = articlesReducer(
            initState,
            {
                type: ArticlesActions.SET_ARTICLE,
                payload: { article }
            });


        /**
         * IT'S IMPORTANT TO CHECK THAT THE LAST STATE AND THE NEW ONE DONT HAVE THE SAME POINTER !
         * SAME FOR CHANGED SUBOBJECTS ! (Like articles).
         * ITS VERY IMPORTANT !!!
         */
        // Test
        expect(nextState === initState).toBeFalsy()
        expect(nextState.articles).toEqual(article);
    });

    it('should override article on SET_ARTICLE', () => {
        // Set up
        const oldArticle = articlesMock[1]
        const newArticle =  { [oldArticle.id] : articlesMock[0] };
        const previousState = Object.assign(
            {},
            initState,
            {
                articles : {[oldArticle.id]: oldArticle}
            });



        // Action
        const nextState = articlesReducer(
            previousState,
            {
                type: ArticlesActions.SET_ARTICLE,
                payload: { article: newArticle }
            });


        /**
         * IT'S IMPORTANT TO CHECK THAT THE LAST STATE AND THE NEW ONE DONT HAVE THE SAME POINTER !
         * SAME FOR CHANGED SUBOBJECTS ! (Like articles).
         * ITS VERY IMPORTANT !!!
         */
        // Test
        expect(nextState === previousState).toBeFalsy()
        expect(nextState.articles[oldArticle.id]).toEqual(_.values(newArticle)[0]);
        expect(nextState.articles).toEqual(newArticle);
    });

    it('should remove an article on REMOVE_ARTICLE', () => {
        // Set up
        const previousState = Object.assign(
            {},
            initState,
            {
                articles : {1: articlesMock[0], 2: articlesMock[1]}
            })

        const expected = Object.assign(
            {},
            previousState,
            {
                articles: {
                    2: articlesMock[1]
                }
            })

        // Action
        const nextState = articlesReducer(
            previousState,
            {
                type: ArticlesActions.REMOVE_ARTICLE,
                payload: {
                    id: 1
                }

            });

        /**
         * IT'S IMPORTANT TO CHECK THAT THE LAST STATE AND THE NEW ONE DONT HAVE THE SAME POINTER !
         * SAME FOR CHANGED SUBOBJECTS ! (Like articles).
         * ITS VERY IMPORTANT !!!
         */
        // Test
        expect(nextState === previousState).toBeFalsy()
        expect(nextState.articles === previousState.articles).toBeFalsy()
        expect(nextState).toEqual(expected);
    });

    it('should be in pending status on FETCH_ARTICLES_REQUEST', () => {

        // Action
        const nextState = articlesReducer(
            initState,
            {
                type: ArticlesActions.FETCH_ARTICLES_REQUEST,
            });


        // Test
        expect(initState === nextState).toBeFalsy()
        expect(nextState.pending).toBeTruthy()
        expect(nextState.error).toBeFalsy()
    })

    it('should make pending status - false , apply articles on FETCH_ARTICLES_SUCCEED', () => {

        // Set up
        let articlesMockObject = normalize(articlesMock, [articleSchema])

        // a state which a request was sent. and the state is pending.
        let previousState = Object.assign({}, initState, { pending : true })


        // Action
        const nextState = articlesReducer(
            previousState,
            {
                type: ArticlesActions.FETCH_ARTICLES_SUCCESS,
                payload: { articles : articlesMockObject }
            });


        // Test
        expect(previousState === nextState).toBeFalsy()
        expect(nextState.articles === articlesMockObject).toBeFalsy()
        expect(nextState.pending).toBeFalsy()
        expect(nextState.error).toBeFalsy()
        expect(nextState.articles).toEqual(articlesMockObject)
    });

    it('should make pending status - false , apply error on FETCH_ARTICLES_FAILURE', () => {
        // Set up

        // a state which a request was sent. and the state is pending.
        let previousState = Object.assign({}, initState, { pending : true })
        let error = new Error("Damn Error")

        // Action
        const nextState = articlesReducer(
            previousState,
            {
                type: ArticlesActions.FETCH_ARTICLES_FAILURE,
                payload: { error : error }
            });

        // Test
        expect(previousState === nextState).toBeFalsy()
        expect(nextState.pending).toBeFalsy()
        expect(nextState.error).toEqual(error)
    });
});
