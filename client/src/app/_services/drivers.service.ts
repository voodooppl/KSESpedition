import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Driver } from '../_models/driver';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { DriverParams } from '../_models/driverParams';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class DriversService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  paginationServices = inject(PaginationService);
  currentDriver = signal<Driver | null>(null);
  driverParams = signal<DriverParams>(new DriverParams());
  driverCache = new Map();

  resetDriverParams(){
    this.driverParams.set(new DriverParams());
  }

  getDrivers() {
    const response = this.driverCache.get(Object.values(this.driverParams()).join('-'));

    if (response) return this.paginationServices.setPaginatedResponse(response);

    let params = this.paginationServices.setPaginationHeaders(this.driverParams().pageNumber, this.driverParams().pageSize);

    params = params.append('orderBy', this.driverParams().orderBy);
    params = params.append('contractStatus', this.driverParams().contractStatus ?? '');

    return this.http.get<Driver[]>(this.baseUrl + 'drivers', {observe: 'response', params}).subscribe({
      next: response => {
        this.paginationServices.setPaginatedResponse(response)
        this.driverCache.set(Object.values(this.driverParams()).join('-'), response);
        }
    });
  }

  getDriverByCnp(cnp: string) {
    // var driver = this.drivers().find(d => d.cnp === cnp);
    // if (driver !== undefined){
    //   this.currentDriver.set(driver);
    //   return of(driver);
    // }      

    return this.http.get<Driver>(this.baseUrl + 'drivers/' + cnp).pipe(
      tap((responseDriver) => {
        this.currentDriver.set(responseDriver);
      })
    );
  }

  addNew(newDriver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.baseUrl + 'drivers/add-new-driver', newDriver);
  }

  updateDriver(driver: Driver) {

    return this.http.put<Driver>(this.baseUrl + 'drivers', driver).pipe(
      // tap((responseDriver) => {
      //   this.drivers.update(drivers => drivers.map(d => d.cnp === driver.cnp ? responseDriver : d));
      //   this.currentDriver.set(responseDriver);
      // })
    );
  }

  deleteDriver(cnp: string) {
    return this.http.delete(this.baseUrl + 'drivers/driver-details/' + cnp);
  }
}
