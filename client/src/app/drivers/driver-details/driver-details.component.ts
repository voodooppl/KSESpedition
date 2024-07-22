import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-driver-details',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './driver-details.component.html',
  styleUrl: './driver-details.component.css'
})
export class DriverDetailsComponent implements OnInit {
  driver: any = {};
  faChevronLeft = faChevronLeft;

  constructor(private router: Router) {
    var navigation = router.getCurrentNavigation();
    this.driver = navigation?.extras.state;
  }
  
  ngOnInit(): void {
  }

}
