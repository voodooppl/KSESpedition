import { Component, Input, inject, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { DriverContractStatuses } from '../../_models/driverContractStatuses';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UtilityService } from '../../_services/utility.service';
import { Driver } from '../../_models/driver';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-driver-card',
  standalone: true,
  imports: [FontAwesomeModule, TitleCasePipe, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './driver-card.component.html',
  styleUrl: './driver-card.component.css'
})
export class DriverCardComponent {
  driver = input.required<Driver>();
  utility = inject(UtilityService);
  faIdCard = faIdCard;

  getDriverContractStatus(status: DriverContractStatuses) {
    return DriverContractStatuses[status];
  }

}


