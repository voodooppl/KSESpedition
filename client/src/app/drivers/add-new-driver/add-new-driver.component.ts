import { Component, OnInit, inject, output } from '@angular/core';
import { DriversService } from '../../_services/drivers.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Driver } from '../../_models/driver';
import { DriverContractStatuses, getEnumValues } from '../../_models/driverContractStatuses';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-new-driver',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './add-new-driver.component.html',
  styleUrl: './add-new-driver.component.css'
})
export class AddNewDriverComponent implements OnInit {
  private driversService = inject(DriversService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private datePipe = inject(DatePipe);
  addDriverForm!: FormGroup;
  cancelAddDriver = output<boolean>();
  newDriver!: Driver;
  driverContracStatuses = getEnumValues(DriverContractStatuses);

  ngOnInit(): void {
    this.addDriverForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      cnp: ['', [Validators.required, Validators.minLength(13),
      Validators.maxLength(13),
      Validators.pattern('^[0-9]*$')]],
      telNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      address: [''],
      driverLicenceNumber: [''],
      driverLicenceExpirationDate: [''],
      drivingCertificateNumber: [''],
      drivingCertificateExpirationDate: [''],
      contractNumber: [''],
      contractStatus: [''],
    })
  }

  addNewDriver() {
    const formValues = this.addDriverForm.value;

    const processedValues = {
      ...formValues,
      driverLicenceExpirationDate: formValues.driverLicenceExpirationDate || this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
      drivingCertificateExpirationDate: formValues.drivingCertificateExpirationDate || this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
      contractStatus: formValues.contractStatus || DriverContractStatuses.Active
    }

    this.driversService.addNew(processedValues).subscribe({
      next: (response) => {
        if (response == null) {
          return;
        }
        this.router.navigateByUrl("drivers");
      },
    });
  }

  cancel() {
    this.cancelAddDriver.emit(false);
    this.router.navigateByUrl("drivers");
  }
}
