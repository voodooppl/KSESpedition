import { Component, OnChanges, Self, SimpleChanges, input } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './textarea-input.component.html',
  styleUrl: './textarea-input.component.css'
})
export class TextareaInputComponent implements ControlValueAccessor, OnChanges {
  label = input.required<string>();
  isEditable = input<boolean>(true);

  constructor(@Self() private ngControl: NgControl) {
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

  private toggleControlState() {
    if (this.isEditable()) {
      this.control.enable();
    } else {
      this.control.disable();
    }
  }

}
