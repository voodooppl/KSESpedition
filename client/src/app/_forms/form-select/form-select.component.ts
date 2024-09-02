import { Component, OnChanges, OnInit, Self, SimpleChanges, inject, input } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { UtilityService } from '../../_services/utility.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-select',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-select.component.html',
  styleUrl: './form-select.component.css'
})
export class FormSelectComponent implements ControlValueAccessor, OnChanges {
  utility = inject(UtilityService);
  label = input<string>();
  isEditable = input<boolean>(true);
  enumValues = input<{ key: string; value: number }[]>();

  constructor(@Self() public ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditable']) {
      this.toggleControlState();
    }
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  private toggleControlState() {
    if (this.isEditable()) {
      this.control.enable();
    } else {
      this.control.disable();
    }
  }

}
