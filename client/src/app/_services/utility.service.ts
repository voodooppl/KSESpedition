import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  getStatusClass(status: string | undefined): string {
    switch (status) {
      case 'Active':
        return 'text-success'; 
      case 'Inactive':
        return 'text-danger'; 
      case 'Suspended':
        return 'text-warning'; 
      default:
        return '';
    }
  }

  checkExpirationDate(date: string | Date | undefined): string {
    if (!date) {
      return 'text-danger';
    }
    
    const expirationDate = date instanceof Date ? date : new Date(date);
    const currentDate = new Date();
    const timeDifference = expirationDate.getTime() - currentDate.getTime();
    const fifteenDaysInMs = 15 * 24 * 60 * 60 * 1000;
  
    if (timeDifference > fifteenDaysInMs) {
      return 'text-info';
    } else if (timeDifference > 0) {
      return 'text-warning';
    } else {
      return 'text-danger';
    }
  }

}
