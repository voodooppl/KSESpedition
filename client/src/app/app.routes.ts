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

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '', 
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {path: 'drivers', component: DriversComponent},
            {path: 'drivers/:id', component: DriverCardComponent},
            {path: 'trucks', component: TrucksComponent},
            {path: 'trucks/:id', component: TruckDetailsComponent},
            {path: 'jobs', component: JobsComponent},
            {path: 'jobs/:id', component: JobDetailsComponent},
        ]
    },
    {path: 'not-found', component: NotFoundComponent},
    {path: 'server-error', component: ServerErrorComponent},
    {path: 'add-new-driver', component: AddNewDriverComponent},
    {path: 'driver-details', component: DriverDetailsComponent},
    {path: '**', component: HomeComponent, pathMatch: 'full'},
];
