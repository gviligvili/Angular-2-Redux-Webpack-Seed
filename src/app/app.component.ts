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
      <span>WebPack Angular 2 Starter by <a [href]="url">@AngularClass</a></span>
      <div>
        <a [href]="url">
          <img [src]="angularclassLogo" width="25%">
        </a>
      </div>
    </footer>
  `
})
export class AppComponent {
    angularclassLogo = 'assets/img/angularclass-avatar.png';
    name = 'Angular 2 Webpack Starterr';
    url = 'https://twitter.com/AngularClass';

    constructor() {
    }

    ngOnInit() {
        console.log('Initial App State', this);
    }
}
