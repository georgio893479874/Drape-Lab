import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Gallery } from './pages/gallery/gallery';
import { Signin } from './pages/signin/signin';
import { Signup } from './pages/signup/signup';
import { Search } from './pages/search/search';
import { Main } from './pages/main/main';
import { Product } from './pages/product/product';
import { Cart } from './pages/cart/cart';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home, data: { hideSidebar: true } },
  { path: 'gallery', component: Gallery, data: { hideSidebar: true } },
  { path: 'signin', component: Signin, data: { hideSidebar: true } },
  { path: 'signup', component: Signup, data: { hideSidebar: true } },
  { path: 'search', component: Search, data: { hideSidebar: true } },
  { path: 'main', component: Main, data: { hideSidebar: false } },
  { path: 'products/:id', component: Product, data: { hideSidebar: true } },
  { path: 'cart', component: Cart, data: { hideSidebar: true } },
  { path: '**', component: NotFound, data: { hideSidebar: true } }
];

