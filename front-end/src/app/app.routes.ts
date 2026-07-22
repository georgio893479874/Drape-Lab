import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Gallery } from './pages/gallery/gallery';
import { Signin } from './pages/signin/signin';
import { Signup } from './pages/signup/signup';
import { Search } from './pages/search/search';
import { Main } from './pages/main/main';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'gallery', component: Gallery },
  { path: 'signin', component: Signin },
  { path: 'signup', component: Signup },
  { path: 'search', component: Search },
  { path: 'main', component: Main },
];

