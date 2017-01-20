import {
  inject,
  TestBed
} from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {NgReduxModule} from 'ng2-redux'
// Load the implementations that should be tested
// import { AppState } from '../app.service';
import { HomeComponent } from './home.component';
import {CounterActions} from "../actions/counterActions/counter.actions";

describe('Home', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ NgReduxModule],
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      // AppState,
      // Title,
      HomeComponent,
      CounterActions,
    ]
  }));

  it('should have default data', inject([ HomeComponent ], (home: HomeComponent) => {
    expect(home.localState).toEqual({ value: '' });
  }));

  it('should have a title', inject([ HomeComponent ], (home: HomeComponent) => {
    // expect(!!home.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ HomeComponent ], (home: HomeComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
