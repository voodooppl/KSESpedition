import { Component, HostListener, OnInit, inject } from '@angular/core';
import { TrucksService } from '../../_services/trucks.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UtilityService } from '../../_services/utility.service';
import { TruckStatuses } from '../../_models/truckStatuses';
import { FuelTypes } from '../../_models/fuelTypes';
import { CanComponentDeactivate } from '../../_guards/prevent-unsaved-changes.guard';
import { TextInputComponent } from "../../_forms/text-input/text-input.component";
import { FormSelectComponent } from "../../_forms/form-select/form-select.component";
import { DatePickerComponent } from "../../_forms/date-picker/date-picker.component";
import { TextareaInputComponent } from "../../_forms/textarea-input/textarea-input.component";

@Component({
  selector: 'app-add-new-truck',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive, TextInputComponent, FormSelectComponent, DatePickerComponent, TextareaInputComponent],
  templateUrl: './add-new-truck.component.html',
  styleUrl: './add-new-truck.component.css'
})
export class AddNewTruckComponent implements OnInit, CanComponentDeactivate {
  private trucksService = inject(TrucksService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  utility = inject(UtilityService);

  addTruckForm!: FormGroup;
  truckStatuses = this.utility.getEnumValues(TruckStatuses);
  fuelTypes = this.utility.getEnumValues(FuelTypes);

  //this is a guard for the browser, for unsaved changes;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.addTruckForm?.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit(): void {
    this.addTruckForm = this.fb.group({
      vin: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      licenceNumber: ['', [Validators.required, Validators.minLength(7)]],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      kmOnBoard: ['0'],
      fuelType: ['', Validators.required],
      owner: [''],
      engineCapacity: ['0'],
      horsePower: ['0'],
      fabricationDate: [''],
      status: ['0'],
      itpExpirationDate: [''],
      insurranceExpirationDate: [''],
      roVignetteExpirationDate: [''],
      germanVignetterExpirationDate: [''],
      nextRevisionDate: [''],
      details: [''],
    })
  }

  canDeactivate() {
    return this.addTruckForm.dirty;
  }

  addNewTruck() {
    const formValues = this.addTruckForm.value;

    const processedValues = {
      ...formValues,
      fabricationDate: formValues.fabricationDate || null,
      itpExpirationDate: formValues.itpExpirationDate || null,
      insurranceExpirationDate: formValues.insurranceExpirationDate || null,
      roVignetteExpirationDate: formValues.roVignetteExpirationDate || null,
      germanVignetterExpirationDate: formValues.germanVignetterExpirationDate || null,
      nextRevisionDate: formValues.nextRevisionDate || null,
      fuelType: formValues.fuelType,
      status: formValues.status.value || null,
      // expenses: formValues.expenses || [],
    }

    this.trucksService.addNewTruck(processedValues).subscribe({
      next: response => {
        if (response == null) return;
        this.addTruckForm.reset();
        this.router.navigateByUrl('trucks')
      },
    });
  }

}
