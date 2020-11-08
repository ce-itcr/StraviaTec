import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/athlete/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/athlete/user/user.component';
import { ActivitiesComponent }      from '../../pages/athlete/activities/activities.component';
import { EnrollmentComponent }      from '../../pages/athlete/enrollment/enrollment.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    ActivitiesComponent,
    EnrollmentComponent
  ]
})

export class AdminLayoutModule {}
