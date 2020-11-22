import { Routes } from '@angular/router';

import { ChallengesManagementComponent } from 'app/pages/organizer/org-challenges-management/challenges-management.component';
import { EnrollmentManagementComponent } from 'app/pages/organizer/org-enrollment-management/enrollment-management.component';
import { GroupsManagementComponent } from 'app/pages/organizer/org-groups-management/groups-management.component';
import { ReportsManagementComponent } from 'app/pages/organizer/org-reports-management/reports-management.component';
import { UserComponent } from 'app/pages/organizer/org-user/user.component';
import { RaceManagementComponent } from '../../pages/organizer/org-race-management/race-management.component';

export const OrganizerLayoutRoutes: Routes = [
    { path: 'race-management', component: RaceManagementComponent },
    { path: 'enrollment-management', component: EnrollmentManagementComponent },
    { path: 'groups-management', component: GroupsManagementComponent },
    { path: 'reports-management', component: ReportsManagementComponent },
    { path: 'user-profile', component: UserComponent },
    { path: 'challenges-management', component: ChallengesManagementComponent}
];
