import { CanDeactivateFn } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export const preventUnsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  if(component.canDeactivate && component.canDeactivate()){
    return confirm('Ai modificari nesalvate. Esti sigur ca vrei sa continui?')
  }
  return true;
};
