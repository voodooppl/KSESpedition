import { Component, OnInit, inject } from '@angular/core';
import { TrucksService } from '../../_services/trucks.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TruckCardComponent } from "../truck-card/truck-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trucks',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TruckCardComponent, CommonModule],
  templateUrl: './trucks.component.html',
  styleUrl: './trucks.component.css'
})
export class TrucksComponent implements OnInit{
  trucksService = inject(TrucksService);

  ngOnInit(): void {
    this.getTrucks();
  }

  getTrucks(){
    this.trucksService.getTrucks();
  }

}
