import {IAppState, rootReducer} from './store';
import {ICounter} from './counter';

const createLogger = require('redux-logger');
const SESSION_KEY = "current_debug_session_key"

export {
    IAppState,
    ICounter,
    rootReducer,
};

export let middleware = [];
export let enhancers = [];

if (ENV === "development") {
    // For "bows" module to work
    // https://www.npmjs.com/package/bows
    localStorage["debug"] = true

    middleware.push(
        createLogger({
            level: 'info',
            collapsed: true,
        }));

}


// Session ID function, don't delete and hope for a future support from "redux dev tools extension".

// function getPersistSession() {
//     // Find the debug session if we have one.
//     const matches = window.location.href.match(/[?&]d=([^&#]+)\b/);
//
//     // If a debug_session was found, save it, and keep it in localstorage
//     // the reason for that, is that even after refresh or hmr, we will have the save store.
//     if (matches && matches.length > 0) {
//         // If match is reset, do not apply any session store on him.
//         // and when refreshing he will just have a clean state each time.
//         if (matches[1] == "reset") {
//             delete localStorage["SESSION_KEY"]
//             console.error("RESET THE DEBUG STATE !")
//             return null;
//         }
//         else
//         {
//             const key = matches[1];
//             localStorage["SESSION_KEY"] = key
//             console.error(localStorage["SESSION_KEY"], " IS THE CURRENT SESSION KEY")
//             return key
//         }
//     }
//
//     // If no session was found, and user hasn't reset the debug session,
//     // apply the recent session
//     console.error(" Applying ! debug state : ",localStorage["SESSION_KEY"])
//     return localStorage["SESSION_KEY"] ? localStorage["SESSION_KEY"] : null
// }
