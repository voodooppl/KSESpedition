import { Component, inject } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RegisterComponent]
})
export class HomeComponent {
  accountService = inject(AccountService);
  registerMode = false;
  
  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }
}
