import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TrucksService } from '../../_services/trucks.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Truck } from '../../_models/truck';
import { ToastrService } from 'ngx-toastr';
import { CanComponentDeactivate } from '../../_guards/prevent-unsaved-changes.guard';
import { UtilityService } from '../../_services/utility.service';
import { FuelTypes } from '../../_models/fuelTypes';
import { TruckStatuses } from '../../_models/truckStatuses';
import { TextInputComponent } from '../../_forms/text-input/text-input.component';
import { DatePickerComponent } from '../../_forms/date-picker/date-picker.component';
import { TextareaInputComponent } from '../../_forms/textarea-input/textarea-input.component';
import { FormSelectComponent } from "../../_forms/form-select/form-select.component";

@Component({
  selector: 'app-truck-details',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, TabsModule, ReactiveFormsModule,
    TextInputComponent, DatePickerComponent, TextareaInputComponent, FormSelectComponent],
  templateUrl: './truck-details.component.html',
  styleUrl: './truck-details.component.css'
})
export class TruckDetailsComponent implements OnInit, CanComponentDeactivate {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private utility = inject(UtilityService);
  
  truckService = inject(TrucksService);
  truckForm!: FormGroup;
  isEditMode: boolean = false;
  isDeleting: boolean = false;
  fuelTypes = this.utility.getEnumValues(FuelTypes);
  truckStatuses = this.utility.getEnumValues(TruckStatuses);

  //this is a guard for the browser, for unsaved changes;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.truckForm?.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit(): void {
    this.getTruckbyId();
    
    this.truckForm = this.fb.group({
      id: [''],
      licenceNumber: ['', Validators.required],
      vin: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      kmOnBoard: ['', Validators.pattern('^[0-9]*$')],
      fuelType: [''],
      owner: [''],
      status: [''],
      engineCapacity: ['', Validators.pattern('^[0-9]*$')],
      horsePower: ['', Validators.pattern('^[0-9]*$')],
      fabricationDate: [''],
      details: [''],
      itpExpirationDate: [''],
      insurranceExpirationDate: [''],
      roVignetteExpirationDate: [''],
      germanVignetterExpirationDate: [''],
      nextRevisionDate: [''],
      log: [''],
      // expenses: [''],
      driver: [''],
      job: [''],
      jobId: [''],
    })

    this.truckForm.patchValue(this.truckService.currentTruck()!);
  }

  canDeactivate(){
    return this.truckForm.dirty;
  };
  
  // getTruckbyLicenceNumber(){
  //   const licenceNumber = this.route.snapshot.paramMap.get('licenceNumber')?.toString();

  //   if (!licenceNumber) return;
  //   this.truckService.getTruckByLicenceNumber(licenceNumber).subscribe({
  //     next: truck => {
  //       this.truck = truck;
  //     }
  //   })
  // }

  getTruckbyId(){
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;
    this.truckService.getTruckById(parseInt(id)).subscribe({
      next: truck => {
        this.truckForm.patchValue(truck);
      }
    })
  }

  setEditMode() {
    this.isEditMode = !this.isEditMode;
    // this.truckForm.reset(this.truck);
  }

  updateTruck(){
    this.truckService.updateTruck(this.truckForm.value).subscribe({
      next: () => {
        this.getTruckbyId();
        this.toastr.success('Camionul a fost modificat cu success.');
        this.isEditMode = false;
        this.truckForm.reset(this.truckService.currentTruck());
      }
    });
  }

  deleteTruck(){
    this.isDeleting = this.canDelete();

    if(this.isDeleting){
      this.truckService.deleteTruck(this.truckService.currentTruck()!.licenceNumber).subscribe({
        next: () => {
          this.isDeleting = false;
          this.toastr.success('Camionul a fost sters.');
          this.router.navigateByUrl('trucks');
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
    return this.truckService.currentTruck()!.details.split('\n');
  }
}
