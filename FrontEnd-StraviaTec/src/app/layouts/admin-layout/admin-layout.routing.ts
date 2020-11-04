import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { ActivitiesComponent } from '../../pages/activities/activities.component';
import { EnrollmentComponent } from '../../pages/enrollment/enrollment.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'activities',     component: ActivitiesComponent },
    { path: 'enrollment',     component: EnrollmentComponent}
];
