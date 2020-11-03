import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppTermsComponent } from './register/app-terms/app-terms.component';
import { AthleteViewComponent } from './athlete-view/athlete-view.component';
import { AthleteSearchComponent } from './athlete-view/athlete-search/athlete-search.component';
import { OrganizerViewComponent } from './organizer-view/organizer-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'app-terms', component: AppTermsComponent},
  { path: 'athlete-view', component: AthleteViewComponent},
  { path: 'athlete-search', component: AthleteSearchComponent},
  { path: 'organizer-view', component: OrganizerViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
