import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import {ArticlesComponent} from "./modules/articles/articles.component";
import {UserDisplayComponent} from "./modules/userDisplay/user-display.component";

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'articles',  component: ArticlesComponent},
  { path: 'user-display',  component: UserDisplayComponent},
  { path: '**',    component: NoContentComponent },
];
