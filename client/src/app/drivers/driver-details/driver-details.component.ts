import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UtilityService } from '../../_services/utility.service';
import { DriverContractStatuses } from '../../_models/driverContractStatuses';
import { DriversService } from '../../_services/drivers.service';
import { Driver } from '../../_models/driver';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CanComponentDeactivate } from '../../_guards/prevent-unsaved-changes.guard';

@Component({
  selector: 'app-driver-details',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive, TitleCasePipe, CommonModule, TabsModule, ReactiveFormsModule],
  templateUrl: './driver-details.component.html',
  styleUrl: './driver-details.component.css'
})
export class DriverDetailsComponent implements OnInit, CanComponentDeactivate {
  driverForm!: FormGroup;
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  driversService = inject(DriversService);
  utility = inject(UtilityService);

  driver!: Driver;
  faChevronLeft = faChevronLeft;
  isEditMode: boolean = false;
  isDeleting: boolean = false;
  driverContracStatuses = this.utility.getEnumValues(DriverContractStatuses);

  //this is a guard for the browser, for unsaved changes;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.driverForm?.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit(): void {
    this.getDriverByCnp();

    this.driverForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      cnp: ['', [Validators.required, Validators.minLength(13),
      Validators.maxLength(13),
      Validators.pattern('^[0-9]*$')]],
      telNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      address: [''],
      employer: [''],
      idNumber: [''],
      idNumberExpirationDate: [''],
      driverLicenceNumber: [''],
      driverLicenceExpirationDate: [''],
      contractNumber: [''],
      contractStatus: [''],
      details: [''],
      log: [''],
      truck: [''],
      job: [''],
    })
  }

  canDeactivate() {
    return this.driverForm.dirty;
  }

  getDriverContractStatus(status: DriverContractStatuses | undefined) {
    if (status == null) return;

    return DriverContractStatuses[status];
  }

  getDriverByCnp() {
    const cnp = this.route.snapshot.paramMap.get('cnp');

    if (!cnp) return;
    this.driversService.getDriverByCnp(cnp).subscribe({
      next: driver => this.driver = driver,
    });
  }

  setEditMode() {
    this.isEditMode = !this.isEditMode;
    this.driverForm.reset(this.driver);
  }

  updateDriver() {
    this.driversService.updateDriver(this.driverForm.value).subscribe({
      next: () => {
        this.getDriverByCnp();
        this.toastr.success('Soferul a fost modificat cu success.')
        this.isEditMode = false;
        this.driverForm.reset(this.driver);
      }
    })
  }

  deleteDriver() {
    this.isDeleting = this.canDelete();

    if (this.isDeleting) {
      this.driversService.deleteDriver(this.driver.cnp).subscribe({
        next: () => {
          this.isDeleting = false;
          this.toastr.success('Soferul a fost sters.')
          this.router.navigateByUrl('drivers');
        }
      })
    }
  }

  canDelete(): boolean {
    if (!this.isDeleting) {
      return confirm('Are you sure you want to delete this entry?');
    }

    return true;
  }

  get detailLines() {
    return this.driver.details.split('\n');
  }

  // private getActionLogs() {
  //   const formValues = this.getEditedFormValues();

  //   const concatenatedString = Object.entries(formValues)
  //     .map(([key, value]) => `${key}: ${value}`)
  //     .join('; ');

  //   var actionLog = this.datePipe.transform(Date.now(), 'dd/MM/yyyy HH:mm:ss') + ' Userul '
  //     + this.accountService.currentUser()?.firstName + ' a facut urmatoarele modificari: ' + concatenatedString;
  //   this.driver.log.push(actionLog);
  // }

  // private processFormValues(callback: (controlName: string, value: any) => void) {
  //   if (this.driverForm) {
  //     for (const controlName in this.driverForm.controls) {
  //       const control = this.driverForm.get(controlName);
  //       if (control && control.dirty) {
  //         callback(controlName, control.value);
  //       }
  //     }
  //   }
  // }

  // private getEditedFormValues() {
  //   const editedValues: { [key: string]: any } = {};
  //   this.processFormValues((controlName, value) => {
  //     editedValues[controlName] = value;
  //   });
  //   return editedValues;
  // }

  // private updateLocalDriver() {
  //   this.processFormValues((controlName, value) => {
  //     (this.driver as any)[controlName] = value;
  //   });
  // }

}
