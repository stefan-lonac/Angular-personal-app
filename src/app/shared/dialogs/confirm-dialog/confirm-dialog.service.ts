import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogDataModel } from './model/confirm-dialog.model';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}

  public open(
    data: ConfirmationDialogDataModel,
  ): Observable<ConfirmationDialogDataModel | undefined> {
    const dialog = this.dialog.open<
      ConfirmDialogComponent,
      ConfirmationDialogDataModel
    >(ConfirmDialogComponent, {
      data,
      minWidth: '250px',
      maxWidth: '521px',
    });

    return dialog.afterClosed();
  }
}
