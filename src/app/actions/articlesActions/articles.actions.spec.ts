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

class MockRedux extends NgRedux<any> {
    constructor() {
        super(null);
    }

    dispatch = function(){};
}

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
                // { provide: VIMEO_API_URL, useValue: 'http://example.com' },
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



    it('Fetching Articles should dispatch FETCH_ARTICLES_REQUEST action', inject([ArticlesActions], (articlesActions /** It will be the service Variable !!*/) => {
        // Set up
        const expectedAction = {
            type: ArticlesActions.FETCH_ARTICLES_REQUEST /** It will be the service CLASS INSTANCE !! That's why I can reach his static members.*/
        };
        var funcSpy = spy(mockRedux, "dispatch");

        // Actions
        articlesActions.fetchArticles();

        // Tests.
        funcSpy.should.have.been.called;
        funcSpy.should.have.been.calledWith(expectedAction)
    }));

    fit('failing to fetch articles should dispatch FETCH_ARTICLES_FAILURE action', async(inject([ArticlesActions, MockBackend], (articlesActions, mockBackend) => {


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
        articlesActions.fetchArticles().then(testing)

        //Test
        function testing() {
            funcSpy.should.have.been.calledTwice;
            funcSpy.getCall(0).should.have.been.calledWithExactly(expectedFirstAction)
            funcSpy.getCall(1).should.have.been.calledWithExactly(expectedSecondAction)
        }
    })));

    it('should succeed fetching the articles and dispatch FETCH_ARTICLES_SUCCESS action with articles payload.', async(inject([ArticlesActions, MockBackend], (articlesActions, mockBackend) => {

        // Setup
        const expectedFirstAction = {
            type: ArticlesActions.FETCH_ARTICLES_REQUEST
        };

        const expectedSecondAction = {
            type: ArticlesActions.FETCH_ARTICLES_SUCCESS,
            payload: {
                articles: {}
            }
        }


        /**
         *  This is called every time someone subscribes to
         *  an http call.
         *  Here we want to fake the http response.
         */
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify({})
            })));
        });

        var funcSpy = spy(mockRedux, 'dispatch');

        // Actions
        articlesActions.fetchArticles().then(testing)

        //Test
        function testing() {
            funcSpy.should.have.been.calledTwice;
            funcSpy.getCall(0).should.have.been.calledWithExactly(expectedFirstAction)
            funcSpy.getCall(1).should.have.been.calledWithExactly(expectedSecondAction)
        }
    })));
});
