import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { ItemListComponent } from 'src/app/item/item-list/item-list.component';
import { ItemPageComponent } from 'src/app/item/item-page/item-page.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { ConfirmDialogService } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.service';

export const CanDeactivateEditGuardFn: CanDeactivateFn<
  ItemPageComponent | ItemListComponent | ProfileComponent
> = (component: ItemPageComponent | ItemListComponent | ProfileComponent) => {
  const confirmDialogService = inject(ConfirmDialogService);

  if (!component.canDeactivateEdit()) {
    confirmDialogService
      .open({
        title: 'Save your data',
        content: 'Please close the popup and save your data.',
        buttonText: 'Close',
      })
      .subscribe();

    return false;
  }

  return true;
};
