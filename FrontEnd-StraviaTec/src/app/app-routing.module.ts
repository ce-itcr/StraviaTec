import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AthleteViewComponent } from './athlete-view/athlete-view.component';
import { AthleteActivitiesComponent } from './athlete-view/athlete-activities/athlete-activities.component';
import { AthleteSearchComponent } from './athlete-view/athlete-search/athlete-search.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'athlete-view', component: AthleteViewComponent},
  { path: 'athlete-activities', component: AthleteActivitiesComponent},
  { path: 'athlete-search', component: AthleteSearchComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
