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
import { AthleteSearchComponent } from './athlete-view/athlete-search/athlete-search.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AppTermsComponent,
    AthleteViewComponent,
    AthleteSearchComponent
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
