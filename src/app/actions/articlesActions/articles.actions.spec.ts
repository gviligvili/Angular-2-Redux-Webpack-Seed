/**
 * Created by talgvili on 22/12/2016.
 */

/**
 * Every test should have this :
 */
var chai = require('chai')
import * as sinon from 'sinon';
import { assert, expect } from 'chai'
import { spy } from 'sinon'
// Letting spies use assertions
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);





import {NgRedux, NgReduxModule} from 'ng2-redux';
import {ArticlesActions} from './articles.actions';
import {TestBed, inject, async} from "@angular/core/testing";
import {HttpModule, Http, BaseRequestOptions, Response, ResponseOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import { normalize } from 'normalizr'
import {articleSchema} from "../../store/schemas";

class MockRedux extends NgRedux<any> {
    constructor() {
        super(null);
    }

    dispatch = function(){};
}

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


describe('articles action creators', () => {
    let mockRedux:NgRedux<any>;

    beforeEach(() => {
        mockRedux = new MockRedux();

        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                NgReduxModule
            ],
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (mockBackend, options) => {
                        return new Http(mockBackend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                {
                    provide: ArticlesActions,
                    useFactory: (http:Http) => {
                        return new ArticlesActions(mockRedux, http);
                    },
                    deps: [Http]
                }
            ]
        });
    });


    it('should add article', inject([ArticlesActions], (articlesActions /** It will be the service Variable !!*/) => {
        // Set up
        let articleData = articlesMock[0]
        let articleNormalized = normalize(articleData, articleSchema)
        // Getting the article object only.
        let article = articleNormalized.entities.articles
        let users = articleNormalized.entities.users

        const expectedAction = {
            type: ArticlesActions.SET_ARTICLE, /** It will be the service CLASS INSTANCE !! That's why I can reach his static members.*/
            payload: {
                article: article,
                users
            }
        };

        var funcSpy = spy(mockRedux, "dispatch");



        // Actions
        articlesActions.addArticle(articleData);



        // Tests.
        funcSpy.should.have.been.called;
        funcSpy.should.have.been.calledWith(expectedAction)
    }));

    it('should remove article', inject([ArticlesActions], (articlesActions /** It will be the service Variable !!*/) => {
            // Set up
            let article = articlesMock[0]

            const expectedAction = {
                type: ArticlesActions.REMOVE_ARTICLE, /** It will be the service CLASS INSTANCE !! That's why I can reach his static members.*/
                payload: {
                    id: article.id,
                }
            };

            var funcSpy = spy(mockRedux, "dispatch");



            // Actions
            articlesActions.removeArticle(article.id);



            // Tests.
            funcSpy.should.have.been.called;
            funcSpy.should.have.been.calledWith(expectedAction)
    }));


    it('Fetching Articles should dispatch FETCH_ARTICLES_REQUEST action', inject([ArticlesActions], (articlesActions) => {
        // Set up
        const expectedAction = {
            type: ArticlesActions.FETCH_ARTICLES_REQUEST
        };
        var funcSpy = spy(mockRedux, "dispatch");



        // Actions
        articlesActions.fetchArticles();



        // Tests.
        funcSpy.should.have.been.called;
        funcSpy.should.have.been.calledWith(expectedAction)
    }));

    it('failing to fetch articles should dispatch FETCH_ARTICLES_FAILURE action', async(inject([ArticlesActions, MockBackend], (articlesActions, mockBackend) => {


        // Setup
        const errorMessage = "error"

        const expectedFirstAction = {
            type: ArticlesActions.FETCH_ARTICLES_REQUEST
        };
        const expectedSecondAction = {
            type: ArticlesActions.FETCH_ARTICLES_FAILURE,
            payload: {
                error: errorMessage
            }
        }

        /**
         *  This is called every time someone subscribes to
         *  an http call.
         *  Here we want to fake the http response.
         */
        mockBackend.connections.subscribe((connection) => {
            connection.mockError(new Error(errorMessage));
        });

        var funcSpy = spy(mockRedux, 'dispatch');



        // Actions
        articlesActions.fetchArticles().complete(testing)



        //Test
        function testing() {
            funcSpy.should.have.been.calledTwice;
            funcSpy.getCall(0).should.have.been.calledWithExactly(expectedFirstAction)
            funcSpy.getCall(1).should.have.been.calledWithExactly(expectedSecondAction)
        }
    })));

    it('should succeed fetching the articles and dispatch FETCH_ARTICLES_SUCCESS action with articles and users payload.', async(inject([ArticlesActions, MockBackend], (articlesActions, mockBackend) => {

        // Setup

        let normalizedArticles = normalize(articlesMock, [articleSchema])
        let articles = normalizedArticles.entities.article;
        let users = normalizedArticles.entities.user;

        const expectedFirstAction = {
            type: ArticlesActions.FETCH_ARTICLES_REQUEST
        };

        const expectedSecondAction = {
            type: ArticlesActions.FETCH_ARTICLES_SUCCESS,
            payload: {
                articles: articles,
                users: users
            }
        }


        /**
         *  This is called every time someone subscribes to
         *  an http call.
         *  Here we want to fake the http response.
         */
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: articlesMock
            })));
        });

        var funcSpy = spy(mockRedux, 'dispatch');



        // Actions
        articlesActions.fetchArticles().complete(testing)



        //Test
        function testing() {
            funcSpy.should.have.been.calledTwice;
            funcSpy.getCall(0).should.have.been.calledWithExactly(expectedFirstAction)
            funcSpy.getCall(1).should.have.been.calledWithExactly(expectedSecondAction)
        }
    })));
});
