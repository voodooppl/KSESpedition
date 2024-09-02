import { CommonModule, NgIf } from '@angular/common';
import { Component, OnChanges, Self, SimpleChanges, inject, input } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { UtilityService } from '../../_services/utility.service';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent implements ControlValueAccessor, OnChanges {
  utility = inject(UtilityService);
  label = input<string>();
  type = input<string>('text');
  textMessage = input<string>();
  isPasswordField = input<boolean>(false);
  isEditable = input<boolean>(true);
  isPasswordVisible = false;

  constructor(@Self() public ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditable']) {
      this.toggleControlState();
    }
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  private toggleControlState() {
    if (this.isEditable()) {
      this.control.enable();
    } else {
      this.control.disable();
    }
  }

}
