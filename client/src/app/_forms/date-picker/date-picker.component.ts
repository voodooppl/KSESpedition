import { CommonModule, NgIf, formatDate } from '@angular/common';
import { Component, OnChanges, OnInit, Self, SimpleChanges, inject, input } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UtilityService } from '../../_services/utility.service';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [BsDatepickerModule, ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent implements ControlValueAccessor, OnChanges, OnInit {
  utility = inject(UtilityService);
  label = input.required<string>();
  isEditable = input<boolean>(true);
  bsConfig?: Partial<BsDatepickerConfig>;
  constructor(@Self() public ngControl: NgControl) {
    ngControl.valueAccessor = this;

    this.bsConfig = {
      containerClass: 'theme-blue',
      dateInputFormat: 'YYYY-MM-DD'
    };
  }

  ngOnInit(): void {
    this.formatInitialValue();
    this.setupValueChangesListener();
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

  private setupValueChangesListener() {
    this.control.valueChanges.subscribe(value => {
      if (value) {
        const formattedDate = formatDate(value, 'yyyy-MM-dd', 'en-RO');
        if (formattedDate !== value) {
          this.control.setValue(formattedDate, { emitEvent: false });
        }
      }
    });
  }

  private formatInitialValue() {
    if (this.control.value) {
      const formattedDate = formatDate(this.control.value, 'yyyy-MM-dd', 'en-RO');
      if (formattedDate !== this.control.value) {
        this.control.setValue(formattedDate, { emitEvent: false });
      }
    }
  }

  private toggleControlState() {
    if (this.isEditable()) {
      this.control.enable();
    } else {
      this.control.disable();
    }
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}

//   constructor(@Self() public ngControl: NgControl) {
//     ngControl.valueAccessor = this;

//     this.bsConfig = {
//       containerClass: 'theme-blue',
//       dateInputFormat: 'YYYY-MM-DD'
//     }
//   }

//   ngOnInit(): void {
//     this.control.valueChanges.subscribe(value => {
//       if (value) {
//         const formattedDate = formatDate(value, 'yyyy-MM-dd', 'en-RO');
//         this.control.setValue(formattedDate, { emitEvent: false });
//       }
//     });

//     if (this.control.value) {
//       const formattedDate = formatDate(this.control.value, 'yyyy-MM-dd', 'en-RO');
//       this.control.setValue(formattedDate, { emitEvent: false });
//     }
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['isEditable']) {
//       if (this.isEditable()) {
//         this.control.enable()
//       } else {
//         this.control.disable()
//       }
//     }


//   }

//   writeValue(obj: any): void {
//   }
//   registerOnChange(fn: any): void {
//   }
//   registerOnTouched(fn: any): void {
//   }

//   get control(): FormControl {
//     return this.ngControl.control as FormControl;
//   }

// }
