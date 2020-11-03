import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppTermsComponent } from './register/app-terms/app-terms.component';
import { AthleteViewComponent } from './athlete-view/athlete-view.component';
import { RaceManagementComponent } from './organizer-view/race-management/race-management.component';
import { ChallengesManagementComponent } from './organizer-view/challenges-management/challenges-management.component';
import { AthleteSearchComponent } from './athlete-view/athlete-search/athlete-search.component';
import { AffiliationManagementComponent } from './organizer-view/affiliation-management/affiliation-management.component';

import { RaceDataTableComponent } from './organizer-view/data-tables/race-data-table/race-data-table.component';
import { AffiliationDataTableComponent } from './organizer-view/data-tables/affiliation-data-table/affiliation-data-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AppTermsComponent,
    AthleteViewComponent,
    AthleteSearchComponent,
    RaceManagementComponent,
    AffiliationManagementComponent,
    ChallengesManagementComponent,
    RaceDataTableComponent,
    AffiliationDataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent}
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
