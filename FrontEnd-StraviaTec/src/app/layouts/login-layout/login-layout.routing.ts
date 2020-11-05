import { Routes } from '@angular/router';
import { RegisterComponent } from 'app/pages/register/register.component';

import { LoginComponent } from '../../pages/login/login.component';

export const LoginLayoutRoutes: Routes = [
    { path: 'login',       component: LoginComponent },
    { path: 'register',    component: RegisterComponent }
];
