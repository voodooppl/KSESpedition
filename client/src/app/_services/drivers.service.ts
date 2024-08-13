import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Driver } from '../_models/driver';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriversService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  drivers = signal<Driver[]>([]);

  getDrivers() {
    return this.http.get<Driver[]>(this.baseUrl + 'drivers').subscribe({
      next: drivers => this.drivers.set(drivers),
    });
  }

  getDriverByCnp(cnp: string) {
    var driver = this.drivers().find(d => d.cnp === cnp);
    if (driver !== undefined){
      return of(driver);
    }      

    return this.http.get<Driver>(this.baseUrl + 'drivers/' + cnp);
  }

  addNew(newDriver: Driver): Observable<Driver> {
    return this.http.post<Driver>(this.baseUrl + 'drivers/add-new-driver', newDriver);
  }

  updateDriver(driver: Driver) {

    return this.http.put(this.baseUrl + 'drivers', driver).pipe(
      tap(() => {
        this.drivers.update(drivers => drivers.map(d => d.cnp === driver.cnp ? driver : d))
      })
    );
  }

  deleteDriver(cnp: string) {
    return this.http.delete(this.baseUrl + 'drivers/driver-details/' + cnp);
  }
}
