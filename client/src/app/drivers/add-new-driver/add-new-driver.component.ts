import { Component, inject, output } from '@angular/core';
import { DriversService } from '../../_services/drivers.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-driver',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './add-new-driver.component.html',
  styleUrl: './add-new-driver.component.css'
})
export class AddNewDriverComponent {
  private driversService = inject(DriversService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  cancelAddDriver = output<boolean>();

  newDriver: any = {};

  addNewDriver() {
    this.driversService.addNew(this.newDriver).subscribe({
      next: (response) => {
        if(response == null) {
          return;
        }
        this.router.navigateByUrl("drivers");
      },
      
      error: error =>{
        console.log('this is the error message' + error.error.message);
        this.toastr.error(error.error.message);
      }
    });
  }

  cancel() {
    this.cancelAddDriver.emit(false);
    this.router.navigateByUrl("drivers");
  }
}
