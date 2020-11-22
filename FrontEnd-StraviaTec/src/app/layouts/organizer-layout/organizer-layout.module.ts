import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrganizerLayoutRoutes } from './organizer-layout.routing';

import { RaceManagementComponent }  from '../../pages/organizer/org-race-management/race-management.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EnrollmentManagementComponent } from 'app/pages/organizer/org-enrollment-management/enrollment-management.component';
import { GroupsManagementComponent } from 'app/pages/organizer/org-groups-management/groups-management.component';
import { ReportsManagementComponent } from 'app/pages/organizer/org-reports-management/reports-management.component';
import { UserComponent } from 'app/pages/organizer/org-user/user.component';
import { ChallengesManagementComponent } from 'app/pages/organizer/org-challenges-management/challenges-management.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(OrganizerLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    RaceManagementComponent,
    ChallengesManagementComponent,
    EnrollmentManagementComponent,
    GroupsManagementComponent,
    ReportsManagementComponent,
    UserComponent
  ]
})

export class OrganizerLayoutModule {}

