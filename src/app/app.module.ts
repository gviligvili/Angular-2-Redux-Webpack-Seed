import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, FormBuilder} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {removeNgStyles, createNewHosts, createInputTransfer} from '@angularclass/hmr';
import {AlertModule, DatepickerModule} from 'ng2-bootstrap/ng2-bootstrap';
import 'bootstrap'


/**
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from './environment';
import {ROUTES} from './app.routes';

// App is our top level component
import {AppComponent} from './app.component';
import {HomeComponent} from './home';
import {NoContentComponent} from './no-content';

/**
 *  Redux Imports
 */
import {CounterActions} from "./actions/counterActions/counter.actions";
import {IAppState, rootReducer} from "./store/store";
import {middleware, enhancers} from "./store/index";
import {NgReduxModule, DevToolsExtension, NgRedux} from "ng2-redux/lib/index";
import {root} from "rxjs/util/root";
import {ArticlesModule} from "./modules/articles/articles.module";
import {UsersDisplayModule} from "./modules/userDisplay/user-display.module";


/**
 * For Hot Module replacement !
 */
type InternalStateType = {
    [key:string]:any
};
type StoreType = {
    state:InternalStateType,
    restoreInputValues:() => void,
    disposeOldHosts:() => void
};


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        NoContentComponent
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        FormsModule,
        HttpModule,
        AlertModule,
        DatepickerModule,
        NgReduxModule,
        RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
        ArticlesModule,
        UsersDisplayModule
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        CounterActions,
        DevToolsExtension,
        FormBuilder,
    ]
})
export class AppModule {
    constructor(public appRef:ApplicationRef,
                private ngRedux:NgRedux<IAppState>,
                private devTools:DevToolsExtension) {

        this.configureStore({});
    }

    configureStore(initState = {}){
        this.ngRedux.configureStore(
            rootReducer,
            {},
            middleware,
            this.devTools.isEnabled() ?
                [...enhancers, this.devTools.enhancer()] :
                enhancers);
    }

    hmrOnInit(store:StoreType) {
        /**
         *  Please don't remove, Its a ready hmrOnInitFunction, Looking for a better
         *  way to implement this rather than localStorage.
         */
        console.log("################ HMR ON INIT ################");

        // If store or store.state doesn't exist, return. (Suppose to be when app just started).
        if (!store || !store.state) return;

        // restore state by dispatch a SET_ROOT_STATE action
        if (store.state) {
            this.ngRedux.dispatch({
                type: 'SET_ROOT_STATE',
                payload: store.state
            })
        }

        // set input values
        if ('restoreInputValues' in store) {
            store.restoreInputValues()
        }
        this.appRef.tick()
        Object.keys(store).forEach(prop => delete store[prop])
    }

    hmrOnDestroy(store:StoreType) {
        console.log("################# HMR ON DESTROY #################");

        console.log(module.hot)
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // save state
        const state = this.ngRedux.getState()
        //const state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store:StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }

}

