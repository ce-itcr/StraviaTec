import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/athlete/dashboard/dashboard.component';
import { UserComponent } from '../../pages/athlete/user/user.component';
import { ActivitiesComponent } from '../../pages/athlete/activities/activities.component';
import { EnrollmentComponent } from '../../pages/athlete/enrollment/enrollment.component';
import { SearchComponent } from '../../pages/athlete/search/search.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'activities',     component: ActivitiesComponent },
    { path: 'enrollment',     component: EnrollmentComponent},
    { path: 'search',         component: SearchComponent }
];
