import { Component, OnInit, inject } from '@angular/core';
import { DriversService } from '../../_services/drivers.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddNewDriverComponent } from '../add-new-driver/add-new-driver.component';
import { DriverCardComponent } from "../driver-card/driver-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drivers',
  standalone: true,
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css',
  imports: [RouterLink, RouterLinkActive, AddNewDriverComponent, DriverCardComponent, CommonModule]
})
export class DriversComponent implements OnInit{
  driversService = inject(DriversService);
  isAddMode = false;

  ngOnInit(): void {
    this.getDrivers();
  }

  toggleAddMode() {
    this.isAddMode = !this.isAddMode;
  }

  cancelIsAddMode(event: boolean) {
    this.isAddMode = event;
  }

  getDrivers() {
    this.driversService.getDrivers();
  }

}
