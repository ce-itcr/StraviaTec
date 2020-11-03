import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppTermsComponent } from './register/app-terms/app-terms.component';
import { AthleteViewComponent } from './athlete-view/athlete-view.component';
import { AthleteSearchComponent } from './athlete-view/athlete-search/athlete-search.component';
import { RaceManagementComponent } from './organizer-view/race-management/race-management.component';
import { AffiliationManagementComponent } from  './organizer-view/affiliation-management/affiliation-management.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'app-terms', component: AppTermsComponent},
  { path: 'athlete-view', component: AthleteViewComponent},
  { path: 'athlete-search', component: AthleteSearchComponent},
  { path: 'race-management', component: RaceManagementComponent},
  { path: 'affiliation-management', component: AffiliationManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
