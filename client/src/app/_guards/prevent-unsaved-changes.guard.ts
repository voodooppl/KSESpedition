import { CanDeactivateFn } from '@angular/router';
import { DriverDetailsComponent } from '../drivers/driver-details/driver-details.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<DriverDetailsComponent> = (component) => {
  if(component.driverForm?.dirty){
    return confirm('Ai modificari nesalvate. Esti sigur ca vrei sa continui?')
  }
  return true;
};
