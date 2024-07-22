import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { DriverContractStatuses } from '../../_models/driverContractStatuses';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-driver-card',
  standalone: true,
  imports: [FontAwesomeModule, TitleCasePipe, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './driver-card.component.html',
  styleUrl: './driver-card.component.css'
})
export class DriverCardComponent {
  @Input() driver: any;
  faIdCard = faIdCard;

  getDriverContractStatus(status: DriverContractStatuses) {
    return DriverContractStatuses[status];
  }

  getStatusClass(status: DriverContractStatuses): string {
    switch (status) {
      case DriverContractStatuses.Active:
        return 'text-success'; 
      case DriverContractStatuses.Inactive:
        return 'text-danger'; 
      case DriverContractStatuses.Suspended:
        return 'text-warning'; 
      default:
        return '';
    }
  }

  checkExpirationDate(date: string | Date): string {
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


