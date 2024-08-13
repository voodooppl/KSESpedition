import { Component, HostListener, OnInit, inject } from '@angular/core';
import { TrucksService } from '../../_services/trucks.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UtilityService } from '../../_services/utility.service';
import { TruckStatuses } from '../../_models/truckStatuses';
import { FuelTypes } from '../../_models/fuelTypes';
import { AccountService } from '../../_services/account.service';
import { CanComponentDeactivate } from '../../_guards/prevent-unsaved-changes.guard';

@Component({
  selector: 'app-add-new-truck',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './add-new-truck.component.html',
  styleUrl: './add-new-truck.component.css'
})
export class AddNewTruckComponent implements OnInit, CanComponentDeactivate {
  private trucksService = inject(TrucksService);
  private accountService = inject(AccountService);
  private datePipe = inject(DatePipe);
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
      vin: ['', Validators.required],
      licenceNumber: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      kmOnBoard: [''],
      fuelType: ['', Validators.required],
      owner: [''],
      engineCapacity: [''],
      horsePower: [''],
      fabricationDate: [''],
      status: [''],
      itpExpirationDate: [''],
      insurranceExpirationDate: [''],
      roVignetteExpirationDate: [''],
      germanVignetterExpirationDate: [''],
      details: [''],
      expenses: [''],
      truckLogs: [''],
    })
  }

  canDeactivate() {
    return this.addTruckForm.dirty;
  }

  addNewTruck() {
    const formValues = this.addTruckForm.value;

    const processedValues = {
      ...formValues,
      kmOnBoard: parseInt(formValues.kmOnBoard) || 0,
      engineCapacity: parseInt(formValues.engineCapacity) || 0,
      horsePower: parseInt(formValues.horsePower) || 0,
      fabricationDate: formValues.fabricationDate || null,
      itpExpirationDate: formValues.itpExpirationDate || null,
      insurranceExpirationDate: formValues.insurranceExpirationDate || null,
      roVignetteExpirationDate: formValues.roVignetteExpirationDate || null,
      germanVignetterExpirationDate: formValues.germanVignetterExpirationDate || null,
      status: formValues.status || null,
      fuelType: formValues.fuelType,
      expenses: formValues.expenses || [],
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
