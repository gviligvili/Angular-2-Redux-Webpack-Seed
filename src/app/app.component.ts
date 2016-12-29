/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.component.scss'
    ],
    template: `
    <nav class="navbar navbar-light bg-faded">
      <a class="navbar-brand" href="#">Ng2-Redux</a>
        <ul class="nav navbar-nav">         
            <li class="nav-item">
                <a [routerLink]=" ['./home'] ">
                          Home
                </a>
            </li>
            <li class="nav-item">
              <a [routerLink]=" ['./articles'] ">
                  Articles
              </a>
            </li>
            <li class="nav-item">
              <a [routerLink]=" ['./user-display'] ">
                  Users
              </a>
            </li>
            <li class="nav-item">
              <a [routerLink]=" ['./about'] ">
                  About
                </a>
            </li>
        </ul>
     </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      <span>Angular 2 & NgRedux & Webpack Starter assembeld by Tal Gvili, original seed Created by @AngularClass  <a href="https://twitter.com/AngularClass">@AngularClass</a></span>
    </footer>
  `
})
export class AppComponent {}
