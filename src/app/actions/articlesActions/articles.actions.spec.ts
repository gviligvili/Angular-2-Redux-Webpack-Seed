/**
 * Created by talgvili on 22/12/2016.
 */

import {NgRedux, NgReduxModule} from 'ng2-redux';
import {ArticlesActions} from './articles.actions';
import {TestBed, inject, async} from "@angular/core/testing";
import {HttpModule, Http, BaseRequestOptions, Response, ResponseOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

class MockRedux extends NgRedux<any> {
    constructor() {
        super(null);
    }

    dispatch:() => {};
}

const mockResponse = {
    "articles": {
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
    }
}

fdescribe('articles action creators', () => {
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

        // Actions
        var spy = spyOn(mockRedux, 'dispatch');
        articlesActions.fetchArticles();

        // Tests.
        expect(mockRedux.dispatch).toHaveBeenCalled();
        expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
    }));

    it('failing to fetch articles should dispatch FETCH_ARTICLES_FAILURE action', inject([ArticlesActions, MockBackend], (articlesActions, mockBackend) => {

        // Setup
        const expectedFirstAction = {
            type: ArticlesActions.FETCH_ARTICLES_REQUEST
        };

        const expectedSecondAction = {
            type: ArticlesActions.FETCH_ARTICLES_FAILURE
        }


        /**
         *  This is called every time someone subscribes to
         *  an http call.
         *  Here we want to fake the http response.
         */
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockResponse)
            })));
        });

            // Actions
        var spy = spyOn(mockRedux, 'dispatch');
        articlesActions.fetchArticles().subscribe(() => {
            console.log("WTFF ASDFSLKADFMASJFASF@#$@#%%%%%%%%%%%%%%%%%%%%%%%");
        });

        // Test
        expect(spy.calls.count()).toBe(2);
        // expect(spy.calls.first().args[0]).toHaveBeenCalledWith(expectedFirstAction);
        // // Check for the second time, after respond was recieved.
        // expect(spy.calls.argsFor(1)).toHaveBeenCalledWith(expectedSecondAction)
    }));
});
