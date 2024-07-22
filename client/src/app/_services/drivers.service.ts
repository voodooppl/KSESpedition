import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject, signal } from '@angular/core';
import { Driver } from '../_models/driver';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriversService implements OnInit {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5001/api/';
  drivers = signal<Driver[]>([]);

  ngOnInit(): void {
    this.getDrivers();
  }

  getDrivers(){
    return this.http.get<Driver[]>(this.baseUrl + 'drivers').pipe(
      map(drvrs => {
        if(drvrs)
          {
            console.log(drvrs);
            this.drivers.set(drvrs);
          };

          return drvrs;
      })
    );
  }

    
  addNew(newDriver: Driver): Observable<Driver | null>{
    
    if (!newDriver || !newDriver.firstName || !newDriver.lastName) {
      console.error('Invalid driver data:', newDriver);
      return of(null);
    }
  
    console.log('this is from drivers service' + newDriver);
    return this.http.post<Driver>(this.baseUrl + 'drivers/add-new-driver', newDriver);
  }
}
