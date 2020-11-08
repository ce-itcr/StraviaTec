import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/athlete/dashboard/dashboard.component';
import { UserComponent } from '../../pages/athlete/user/user.component';
import { ActivitiesComponent } from '../../pages/athlete/activities/activities.component';
import { EnrollmentComponent } from '../../pages/athlete/enrollment/enrollment.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'activities',     component: ActivitiesComponent },
    { path: 'enrollment',     component: EnrollmentComponent}
];
