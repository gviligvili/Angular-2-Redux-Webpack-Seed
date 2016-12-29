import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import {IAppState} from "../../store/store";

@Injectable()
export class CounterActions {
  static INCREMENT_COUNTER = 'INCREMENT_COUNTER';
  static DECREMENT_COUNTER = 'DECREMENT_COUNTER';
  static UNDO_COUNTER = 'UNDO_COUNTER';
  static REDO_COUNTER = "REDO_COUNTER";
  constructor(private ngRedux: NgRedux<IAppState>) {}

  increment() {
    this.ngRedux.dispatch({ type: CounterActions.INCREMENT_COUNTER });
  }

  decrement() {
    this.ngRedux.dispatch({ type: CounterActions.DECREMENT_COUNTER });
  }

  undo() {
    this.ngRedux.dispatch({ type: CounterActions.UNDO_COUNTER})
  }

  redo(){
    this.ngRedux.dispatch({ type: CounterActions.REDO_COUNTER})
  }
}
