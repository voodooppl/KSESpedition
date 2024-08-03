import { Component, OnInit, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);
  cancelRegister = output<boolean>();
  model: any = {};
  userRegisterForm!: FormGroup;
  
  ngOnInit(): void {
    this.userRegisterForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  register(){
    this.accountService.register(this.userRegisterForm.value).subscribe({
      next: () => {
        this.cancel();
      },
      error: error => {
        this.toastr.error(error.error);
      }
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
