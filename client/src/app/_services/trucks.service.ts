import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Truck } from '../_models/truck';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';
import { TruckParams } from '../_models/truckParams';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class TrucksService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  paginationServices = inject(PaginationService);
  currentTruck = signal<Truck | null>(null);
  truckParams = signal<TruckParams>(new TruckParams());
  truckCache = new Map();

  resetTruckParams(){
    this.truckParams.set(new TruckParams());
  }

  getTrucks() {
    const response = this.truckCache.get(Object.values(this.truckParams()).join('-'));

    if (response) return this.paginationServices.setPaginatedResponse(response);

    let params = this.paginationServices.setPaginationHeaders(this.truckParams().pageNumber, this.truckParams().pageSize);

    params = params.append('orderBy', this.truckParams().orderBy);
    params = params.append('truckStatuses', this.truckParams().truckStatuses ?? '');
    params = params.append('fuelTypes', this.truckParams().fuelTypes ?? '');


    return this.http.get<Truck[]>(this.baseUrl + 'trucks', {observe: 'response', params}).subscribe({
      next: response => {
        this.paginationServices.setPaginatedResponse(response)
        this.truckCache.set(Object.values(this.truckParams()).join('-'), response);
      },
    })
  }

  getTruckByLicenceNumber(licenceNumber: string){
    // var truck = this.trucks().find(d => d.licenceNumber === licenceNumber);
    // if (truck !== undefined){
    //   return of(truck);
    // } 
    // return this.http.get<Truck>(this.baseUrl + 'trucks/' + licenceNumber);
  }

  getTruckById(id: number){
    // var truck = this.trucks().find(d => d.id === id);
    // if (truck !== undefined){
    //   return of(truck);
    // } 
    return this.http.get<Truck>(this.baseUrl + 'trucks/' + id).pipe(
      tap(truck => this.currentTruck.set(truck))
    )
  }

  addNewTruck(newTruck: Truck){
    return this.http.post<Truck>(this.baseUrl + 'trucks/add-new-truck', newTruck);
  }

  updateTruck(truck: Truck){
    return this.http.put<Truck>(this.baseUrl + 'trucks', truck).pipe(
      // tap(() => {
      //   this.trucks.update(trucks => trucks.map(t => t.id == truck.id ? truck : t))
      // })
    );
  }

  deleteTruck(licenceNumber: string){
    return this.http.delete<Truck>(this.baseUrl + 'trucks/' + licenceNumber);
  }

}
