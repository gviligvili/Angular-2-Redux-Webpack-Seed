import { Component } from '@angular/core';
import {CounterActions} from "../actions/counterActions/counter.actions";
import {select, NgRedux} from "ng2-redux/lib/index";
import {Observable} from "rxjs/Rx";
import {IAppState} from "../store/store";
import {ICounter} from "../store/counter/counter.types";

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    CounterActions
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.scss'],



  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent {
  // Set our default values
  localState = { value: '' };
  date: Date = new Date();
  jqueryIsOn = !!$;
  lodashIsOn = !!_;

  @select(s=> {
    return s.counter.present.counter
  }) private counter$: Observable<ICounter>;


  // TypeScript public modifiers
  constructor(private counterActions:CounterActions,private ngRedux: NgRedux<IAppState>) {

  }

  ngOnInit() {
    console.log('helllo `Home` component');
  }

  onBtnClick() {
    this.counterActions.increment();
  }

  redoCounter() {
    this.counterActions.redo()
  }

  undoCounter(){
    this.counterActions.undo();
  }
}
