import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Gallery } from './pages/gallery/gallery';
import { Signin } from './pages/signin/signin';
import { Signup } from './pages/signup/signup';
import { Search } from './pages/search/search';
import { Main } from './pages/main/main';
import { Product } from './pages/product/product';
import { Cart } from './pages/cart/cart';
import { Profile } from './pages/profile/profile';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';
import { productResolver } from './resolvers/product-resolver';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivate: [guestGuard],
    data: {
      hideSidebar: true,
    },
  },
  {
    path: 'gallery',
    component: Gallery,
    canActivate: [guestGuard],
    data: {
      hideSidebar: true,
    },
  },
  {
    path: 'signin',
    component: Signin,
    canActivate: [guestGuard],
    data: {
      hideSidebar: true,
    },
  },
  {
    path: 'signup',
    component: Signup,
    canActivate: [guestGuard],
    data: {
      hideSidebar: true,
    },
  },
  {
    path: 'main',
    component: Main,
    canActivate: [authGuard],
    data: {
      hideSidebar: false,
      breadcrumb: 'Products',
    },
  },
  {
    path: 'search',
    component: Search,
    canActivate: [authGuard],
    data: {
      hideSidebar: true,
      breadcrumb: 'Search',
    },
  },
  {
    path: 'products/:id',
    component: Product,
    canActivate: [authGuard],
    resolve: {
      product: productResolver,
    },
    data: {
      hideSidebar: true,
    },
  },
  {
    path: 'cart',
    component: Cart,
    canActivate: [authGuard],
    data: {
      hideSidebar: true,
      breadcrumb: 'Cart',
    },
  },
  {
    path: 'profile/:id',
    component: Profile,
    canActivate: [authGuard],
    data: {
      hideSidebar: true,
      breadcrumb: 'Profile',
    },
  },
  {
    path: '**',
    component: NotFound,
    data: {
      hideSidebar: true,
    },
  },
];