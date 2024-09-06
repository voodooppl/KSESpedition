import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DriversComponent } from './drivers/drivers/drivers.component';
import { DriverCardComponent } from './drivers/driver-card/driver-card.component';
import { TrucksComponent } from './trucks/trucks/trucks.component';
import { TruckDetailsComponent } from './trucks/truck-details/truck-details.component';
import { JobsComponent } from './jobs/jobs/jobs.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';
import { authGuard } from './_guards/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AddNewDriverComponent } from './drivers/add-new-driver/add-new-driver.component';
import { DriverDetailsComponent } from './drivers/driver-details/driver-details.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { AddNewTruckComponent } from './trucks/add-new-truck/add-new-truck.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'drivers', component: DriversComponent },
            {
                path: 'add-new-driver', component: AddNewDriverComponent,
                canDeactivate: [preventUnsavedChangesGuard]
            },
            {
                path: 'driver-details/:cnp', component: DriverDetailsComponent,
                canDeactivate: [preventUnsavedChangesGuard]
            },

            { path: 'trucks', component: TrucksComponent },
            {
                path: 'truck-details/:id', component: TruckDetailsComponent,
                canDeactivate: [preventUnsavedChangesGuard]
            },
            {
                path: 'add-new-truck', component: AddNewTruckComponent,
                canDeactivate: [preventUnsavedChangesGuard]
            },

            { path: 'jobs', component: JobsComponent },
            { path: 'jobs/:id', component: JobDetailsComponent },
        ]
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'server-error', component: ServerErrorComponent },
    { path: '**', component: HomeComponent, pathMatch: 'full' },
];
