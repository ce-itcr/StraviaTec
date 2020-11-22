import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { OrganizerLayoutComponent } from './layouts/organizer-layout/organizer-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


export const AppRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent,},
  {
    path: 'dashboard',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    runGuardsAndResolvers: 'always'
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }],
},


{
  path: 'race-management',
  redirectTo: 'race-management',
  pathMatch: 'full',
  runGuardsAndResolvers: 'always'
},
{
  path: '',
  component: OrganizerLayoutComponent,
  children: [
    {
      path: '',
      loadChildren: './layouts/organizer-layout/organizer-layout.module#OrganizerLayoutModule'

    }
  ]
},



  {
    path: '**',
    redirectTo: ''
  },


]
