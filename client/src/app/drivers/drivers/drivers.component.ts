import { Component, OnInit, inject } from '@angular/core';
import { DriversService } from '../../_services/drivers.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddNewDriverComponent } from '../add-new-driver/add-new-driver.component';
import { DriverCardComponent } from "../driver-card/driver-card.component";
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { UtilityService } from '../../_services/utility.service';
import { DriverContractStatuses } from '../../_models/driverContractStatuses';
import { PaginationService } from '../../_services/pagination.service';

@Component({
  selector: 'app-drivers',
  standalone: true,
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css',
  imports: [RouterLink, RouterLinkActive, AddNewDriverComponent, DriverCardComponent, CommonModule, PaginationModule, FormsModule]
})
export class DriversComponent implements OnInit{
  driversService = inject(DriversService);
  paginationServices = inject(PaginationService);
  utility = inject(UtilityService);
  driverContracStatuses = this.utility.getEnumValues(DriverContractStatuses);
  isAddMode = false;
  orderCategories = [
    {value: 'created', display: 'Created'},
    {value: 'idExpirationDate', display: 'Id Expiration Date'},
    {value: 'driverLicenceExpirationDate', display: 'Licence Expiration Date'},
    {value: 'dateOfBirth', display: 'Date of Birth'},
    {value: 'lastName', display: 'Last Name'},
  ]

  ngOnInit(): void {
    this.paginationServices.resetPagination();
    this.getDrivers();
  }

  resetFilters(){
    this.driversService.resetDriverParams();
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

  pageChanged(event: any) {
    if (this.driversService.driverParams().pageNumber !== event.page) {
      this.driversService.driverParams().pageNumber = event.page;
      this.getDrivers();
    }
  }

}
