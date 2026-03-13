import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Admin } from './components/admin/admin';
import { Landing } from './components/landing/landing';
import { ErrorPage } from './components/error-page/error-page.component';

export const routes: Routes = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'admin',
    component: Admin,
  },
  {
    path: '404',
    component: ErrorPage,
  },
  {
    path: '**',
    redirectTo: '404',
  }
];
