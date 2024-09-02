import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, TitleCasePipe, formatDate } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UtilityService } from '../../_services/utility.service';
import { DriverContractStatuses } from '../../_models/driverContractStatuses';
import { DriversService } from '../../_services/drivers.service';
import { Driver } from '../../_models/driver';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CanComponentDeactivate } from '../../_guards/prevent-unsaved-changes.guard';
import { TextInputComponent } from "../../_forms/text-input/text-input.component";
import { FormSelectComponent } from "../../_forms/form-select/form-select.component";
import { DatePickerComponent } from '../../_forms/date-picker/date-picker.component';
import { TextareaInputComponent } from "../../_forms/textarea-input/textarea-input.component";


@Component({
  selector: 'app-driver-details',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive, TitleCasePipe, CommonModule,
    TabsModule, ReactiveFormsModule, TextInputComponent, FormSelectComponent, DatePickerComponent, TextareaInputComponent],
  templateUrl: './driver-details.component.html',
  styleUrl: './driver-details.component.css'
})
export class DriverDetailsComponent implements OnInit, CanComponentDeactivate {

  private router = inject(Router);
  private route = inject(ActivatedRoute)
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  driversService = inject(DriversService);
  private detailsControl: AbstractControl | null = null;
  utility = inject(UtilityService);

  driverForm!: FormGroup;
  driver!: Driver;
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
      employer: [''],
      address: [''],
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

    this.driverForm.patchValue(this.driversService.currentDriver()!);
    
    this.detailsControl = this.driverForm.get('details');
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
      next: driver => this.driverForm.patchValue(driver)
    });
  }

  setEditMode() {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      this.detailsControl?.enable();
    } else {
      this.detailsControl?.disable();
    }
  }

  updateDriver() {
    this.driversService.updateDriver(this.driverForm.value).subscribe({
      next: () => {
        this.getDriverByCnp();
        this.toastr.success('Soferul a fost modificat cu success.')
        this.isEditMode = false;
        this.driverForm.reset(this.driversService.currentDriver());
      }
    })
  }

  deleteDriver() {
    this.isDeleting = this.canDelete();

    if (this.isDeleting) {
        this.driversService.deleteDriver(this.driversService.currentDriver()!.cnp).subscribe({
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
    return this.driversService.currentDriver()!.details.split('\n');
  }

}
