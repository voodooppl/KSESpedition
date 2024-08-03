import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanDeleteItem {
  canDelete: () => boolean | Promise<boolean>;
}

export const deleteGuard: CanDeactivateFn<CanDeleteItem> = (component) => {
  if (!component.canDelete) {
    return true;
  }

  const result = component.canDelete();

  if (result instanceof Promise) {
    return result.then((canDelete) => {
      if (canDelete) {
        return confirm('Are you sure you want to delete this item?');
      }
      return true;
    });
  }

  if (result) {
    return confirm('Are you sure you want to delete this item?');
  }
  
  return true;
};
