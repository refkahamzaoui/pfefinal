import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { PlanIntegrationComponent } from '../../pages/plan-integration/plan-integration.component';
import { PlanFormComponent } from 'src/app/pages/plan-form/plan-form.component';
import { TemplatesComponent } from 'src/app/pages/templates/templates.component';
import { TaskCreateComponent } from 'src/app/pages/task-create/task-create.component';
import { DetailsComponent } from 'src/app/pages/details/details.component';
import { EditTaskComponent } from 'src/app/pages/edit-task/edit-task.component';
import { FavoritesComponent } from 'src/app/pages/favorites/favorites.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'plan-integration',           component: PlanIntegrationComponent},
    { path: 'task-create',           component: TaskCreateComponent},

    { path: 'plan-integration/:status', component: PlanIntegrationComponent },
    { path: 'plan-form', component: PlanFormComponent },
    { path: 'templates', component: TemplatesComponent },
    { path: 'details', component: DetailsComponent },
    { path: 'task-edit/:id', component: EditTaskComponent }  ,
    { path: 'favorites', component: FavoritesComponent }  


    


];
