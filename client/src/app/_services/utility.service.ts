import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  getEnumValues(enumObj: any): { key: string, value: number }[] {
    return Object.keys(enumObj)
      .filter(key => isNaN(Number(key)))
      .map(key => ({ key, value: enumObj[key] }));
  }

  getStatusClass(status: string | undefined): string {
    switch (status) {
      case 'Active':
        return 'text-dark';
      case 'Inactive':
        return 'text-danger';
      case 'Suspended':
        return 'text-warning';
      case 'Sold':
        return 'text-danger';
      case 'Disposed':
        return 'text-danger';
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
      return 'text-dark';
    } else if (timeDifference > 0) {
      return 'text-warning';
    } else {
      return 'text-danger';
    }
  }

}
