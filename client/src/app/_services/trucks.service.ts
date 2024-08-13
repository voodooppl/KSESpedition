import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject, signal } from '@angular/core';
import { Truck } from '../_models/truck';
import { environment } from '../../environments/environment';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrucksService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  trucks = signal<Truck[]>([]);

  getTrucks() {
    return this.http.get<Truck[]>(this.baseUrl + 'trucks').subscribe({
      next: trucks => this.trucks.set(trucks),
    })
  }

  getTruckByLicenceNumber(licenceNumber: string){
    var truck = this.trucks().find(d => d.licenceNumber === licenceNumber);
    if (truck !== undefined){
      return of(truck);
    } 
    return this.http.get<Truck>(this.baseUrl + 'trucks/' + licenceNumber);
  }

  getTruckById(id: number){
    var truck = this.trucks().find(d => d.id === id);
    if (truck !== undefined){
      return of(truck);
    } 
    return this.http.get<Truck>(this.baseUrl + 'trucks/' + id);
  }

  addNewTruck(newTruck: Truck){
    return this.http.post<Truck>(this.baseUrl + 'trucks/add-new-truck', newTruck);
  }

  updateTruck(truck: Truck){
    return this.http.put<Truck>(this.baseUrl + 'trucks', truck).pipe(
      tap(() => {
        this.trucks.update(trucks => trucks.map(t => t.id == truck.id ? truck : t))
      })
    );
  }

  deleteTruck(licenceNumber: string){
    return this.http.delete<Truck>(this.baseUrl + 'trucks/' + licenceNumber);
  }

}
