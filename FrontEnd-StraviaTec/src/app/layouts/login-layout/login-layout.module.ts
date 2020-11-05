import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginLayoutRoutes } from './login-layout.routing';

import { LoginComponent }           from '../../pages/login/login.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from 'app/pages/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})

export class LoginLayoutModule {}
