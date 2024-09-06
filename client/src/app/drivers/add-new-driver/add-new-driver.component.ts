import { Component, HostListener, OnInit, inject, output } from '@angular/core';
import { DriversService } from '../../_services/drivers.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Driver } from '../../_models/driver';
import { DriverContractStatuses } from '../../_models/driverContractStatuses';
import { CommonModule } from '@angular/common';
import { UtilityService } from '../../_services/utility.service';
import { CanComponentDeactivate } from '../../_guards/prevent-unsaved-changes.guard';
import { TextInputComponent } from "../../_forms/text-input/text-input.component";
import { FormSelectComponent } from '../../_forms/form-select/form-select.component';
import { DatePickerComponent } from "../../_forms/date-picker/date-picker.component";
import { TextareaInputComponent } from "../../_forms/textarea-input/textarea-input.component";

@Component({
  selector: 'app-add-new-driver',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule, TextInputComponent, FormSelectComponent, DatePickerComponent, TextareaInputComponent],
  templateUrl: './add-new-driver.component.html',
  styleUrl: './add-new-driver.component.css'
})
export class AddNewDriverComponent implements OnInit, CanComponentDeactivate {
  private driversService = inject(DriversService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  utility = inject(UtilityService);
  addDriverForm!: FormGroup;
  cancelAddDriver = output<boolean>();
  newDriver!: Driver;
  driverContracStatuses = this.utility.getEnumValues(DriverContractStatuses);

  //this is a guard for the browser, for unsaved changes;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.addDriverForm?.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit(): void {
    this.addDriverForm = this.fb.group({
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
      contractStatus: ['0'],
      details: [''],
    })
  }

  canDeactivate(){
    return this.addDriverForm.dirty;
  }

  addNewDriver() {
    const formValues = this.addDriverForm.value;

    const processedValues = {
      ...formValues,
      driverLicenceExpirationDate: formValues.driverLicenceExpirationDate || null,
      idNumberExpirationDate: formValues.idNumberExpirationDate || null,
      // contractStatus: formValues.contractStatus || null,
    }

    this.driversService.addNew(processedValues).subscribe({
      next: (response) => {
        if (response == null) {
          return;
        }
        this.addDriverForm.reset();
        this.router.navigateByUrl("drivers");
      },
    });
  }

  cancel() {
    this.cancelAddDriver.emit(false);
    this.router.navigateByUrl("drivers");
  }
}
