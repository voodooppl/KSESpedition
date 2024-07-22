import { Component, inject } from '@angular/core';
import { DriversService } from '../../_services/drivers.service';
import { Driver } from '../../_models/driver';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddNewDriverComponent } from '../add-new-driver/add-new-driver.component';
import { DriverCardComponent } from "../driver-card/driver-card.component";
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-drivers',
    standalone: true,
    templateUrl: './drivers.component.html',
    styleUrl: './drivers.component.css',
    imports: [RouterLink, RouterLinkActive, AddNewDriverComponent, DriverCardComponent, NgFor]
})
export class DriversComponent {
  private driversService = inject(DriversService);
  drivers: Driver[] = [];
  isAddMode = false;

  constructor() {
    this.getDrivers();
  }

  toggleAddMode() {
    this.isAddMode = !this.isAddMode;
  }

  cancelIsAddMode(event: boolean){
    this.isAddMode = event;
  }

  getDrivers() {
    this.driversService.getDrivers().subscribe(
      drvrs => {
        this.drivers = drvrs;
      }
    )
  }

}
