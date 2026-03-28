import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register-comps/register/register';
import { Admin } from './components/admin/admin';
import { Landing } from './components/landing/landing';
import { ErrorPage } from './components/error-page/error-page.component';
import { ConfirmEmail } from './components/register-comps/confirm-email/confirm-email.component';
import { VerifyEmail } from './components/register-comps/verify-email/verify-email';
import { Panel } from './components/main-panel/panel/panel';

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
    path: 'chatting',
    component: Panel,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'confirm-email',
    component: ConfirmEmail,
  },
  {
    path: 'verify-email',
    component: VerifyEmail,
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
