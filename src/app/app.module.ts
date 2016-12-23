import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, FormBuilder} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {removeNgStyles, createNewHosts, createInputTransfer} from '@angularclass/hmr';
import {AlertModule, DatepickerModule} from 'ng2-bootstrap/ng2-bootstrap';


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
import {SessionActions} from "./actions/session.actions";
import {CounterActions} from "./actions/counter.actions";
import {IAppState, rootReducer} from "./store/store";
import {middleware, enhancers} from "./store/index";
import {NgReduxModule, DevToolsExtension, NgRedux} from "ng2-redux/lib/index";
import {root} from "rxjs/util/root";
import {ArticlesModule} from "./modules/articles/articles.module";


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
        NgReduxModule.forRoot(),
        RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
        ArticlesModule
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        ENV_PROVIDERS,
        CounterActions,
        DevToolsExtension,
        FormBuilder,
        SessionActions,
    ]
})
export class AppModule {
    constructor(public appRef:ApplicationRef,
                private ngRedux:NgRedux<IAppState>,
                private devTools:DevToolsExtension,
                private actions:SessionActions
                /*public appState: AppState*/) {

        this.configureStore({});

        console.log("################ INITIALIZED STORE #################")

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
        // console.log("################ HMR ON INIT ################");
        //
        // // If store or store.state doesn't exist, return. (Suppose to be when app just started).
        // if (!store || !store.state) return;
        // console.log('HMR store', JSON.stringify(store, null, 2));
        // console.log('%c @@@@@@Store: ', store, " store.state ", store.state, 'background: #222; color: #bada55');
        //
        // /**
        //  *  Set the state we saved before HMR
        //  */
        //
        // if (module.hot) {
        //     console.log("Got INto IF !@#");
        //     module.hot.accept("./store/reducers", () => {
        //         console.log(" MODULE.HOT.ACCEPT @@@@#@%#$%$^$%&$%&");
        //         debugger;
        //         const nextReducer = require('./store/reducers');
        //         this.ngRedux.replaceReducer(nextReducer);
        //     });
        // }
        //
        // // this.ngRedux.? = this.store.state

        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
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

