import { Component, inject, input } from '@angular/core';
import { Truck } from '../../_models/truck';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UtilityService } from '../../_services/utility.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TruckStatuses } from '../../_models/truckStatuses';

@Component({
  selector: 'app-truck-card',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './truck-card.component.html',
  styleUrl: './truck-card.component.css'
})
export class TruckCardComponent {
  utility = inject(UtilityService);
  truck = input.required<Truck>();
  truckStatuses = this.utility.getEnumValues(TruckStatuses);
}
