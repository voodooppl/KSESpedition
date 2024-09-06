import { Component, OnInit, inject } from '@angular/core';
import { TrucksService } from '../../_services/trucks.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TruckCardComponent } from "../truck-card/truck-card.component";
import { CommonModule } from '@angular/common';
import { PaginationService } from '../../_services/pagination.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { UtilityService } from '../../_services/utility.service';
import { TruckStatuses } from '../../_models/truckStatuses';
import { FuelTypes } from '../../_models/fuelTypes';

@Component({
  selector: 'app-trucks',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TruckCardComponent, CommonModule, PaginationModule, FormsModule],
  templateUrl: './trucks.component.html',
  styleUrl: './trucks.component.css'
})
export class TrucksComponent implements OnInit{
  private utility = inject(UtilityService);
  trucksService = inject(TrucksService);
  paginationServices = inject(PaginationService);
  truckStatuses = this.utility.getEnumValues(TruckStatuses);
  fuelTypes = this.utility.getEnumValues(FuelTypes);
  orderCategories = [
    {value: 'created', display: 'Created'},
    {value: 'manufacturer', display: 'Manufacturer'},
    {value: 'model', display: 'Model'},
    {value: 'insurranceExpirationDate', display: 'Insurrance Expiration Date'},
    {value: 'roVignetteExpirationDate', display: 'RoVignette Expiration Date'},
    {value: 'iTPExpirationDate', display: 'ITP Expiration Date'},
    {value: 'nextRevisionDate', display: 'Next Revision Date'},
    {value: 'fabricationDate', display: 'Fabrication Date'},
    {value: 'engineCapacity', display: 'Engine Capacity'},
    {value: 'horsePower', display: 'Horse Power'},
    {value: 'kmOnBoard', display: 'Km On Board'},
  ]

  ngOnInit(): void {
    this.paginationServices.resetPagination();
    this.getTrucks();
  }

  resetFilters(){
    this.trucksService.resetTruckParams();
    this.getTrucks();
  }

  getTrucks(){
    this.trucksService.getTrucks();
  }

  pageChanged(event: any) {
    if (this.trucksService.truckParams().pageNumber !== event.page) {
      this.trucksService.truckParams().pageNumber = event.page;
      this.getTrucks();
    }
  }

}
