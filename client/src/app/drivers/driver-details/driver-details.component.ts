import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UtilityService } from '../../_services/utility.service';
import { DriverContractStatuses, getEnumValues } from '../../_models/driverContractStatuses';
import { DriversService } from '../../_services/drivers.service';
import { Driver } from '../../_models/driver';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-driver-details',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive, TitleCasePipe, CommonModule, TabsModule,  ReactiveFormsModule],
  templateUrl: './driver-details.component.html',
  styleUrl: './driver-details.component.css'
})
export class DriverDetailsComponent implements OnInit {
  // @ViewChild('editForm') editForm?: NgForm;
  driverForm!: FormGroup;
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  private datePipe = inject(DatePipe);
  driversService = inject(DriversService);
  utility = inject(UtilityService);

  driver!: Driver;
  faChevronLeft = faChevronLeft;
  isEditMode: boolean = false;
  isDeleting: boolean = false;
  driverContracStatuses = getEnumValues(DriverContractStatuses);

  //this is a guard for the browser, for unsaved changes;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.driverForm?.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit(): void {
    this.driverForm = this.fb.group({
      cnp: ['', Validators.required],
      telNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      dateOfBirt: ['', Validators.required],
      driverLicenceNumber: ['', Validators.required],
      driverLicenceExpirationDate: ['', Validators.required],
      contractNumber: ['', Validators.required],
      contractStatus: ['', Validators.required],
      actionsLog: ['', Validators.required]
    })

    this.getDriverByCnp();
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

  seEditMode() {
    this.isEditMode = !this.isEditMode;
    this.driverForm.reset(this.driver);
  }

  updateDriver() {
    this.getActionLogs();

    this.driversService.updateDriver(this.driverForm.value).subscribe({
      next: () => {
        this.toastr.success('Soferul a fost modificat cu success.')
        this.getDriverByCnp();
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

  private getEditedFormValues() {
    const editedValues: { [key: string]: any } = {};
    if (this.driverForm) {
      Object.keys(this.driverForm.controls).forEach(key => {
        const control = this.driverForm.get(key);
        if (control?.dirty) {
          editedValues[key] = control.value;
        }
      });
    }

    return editedValues;
  }

  private getActionLogs() {
    const formValues = this.getEditedFormValues();

    const concatenatedString = Object.entries(formValues)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');

    var actionLog = this.datePipe.transform(Date.now(), 'dd/MM/yyyy HH:mm:ss') + ' Userul '
      + this.accountService.currentUser()?.firstName + ' a facut urmatoarele modificari: ' + concatenatedString;
    this.driver.actionsLog.push(actionLog);
  }

}
