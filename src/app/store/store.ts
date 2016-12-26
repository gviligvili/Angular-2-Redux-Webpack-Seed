import * as counter from './counter';
import * as session from './session';
// import * as articles from './articles'
import rootReducer from './reducers'

export interface IAppState {
  counter?: counter.ICounter;
  session?: session.ISession;
  // articles?: articles.IArticles;
};

export {rootReducer}

// export function deimmutify(store) {
//     debugger;
//   return {
//     counter: store.counter.toJS(),
//     session: store.session.toJS(),
//   };
// }
//
// export function reimmutify(plain) {
//   return {
//     counter: counter.CounterFactory(plain.counter),
//     session: session.SessionFactory(plain.session),
//   };
// }
