import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeleteDialogComponent } from './delete-dialog.component';
import { DeleteDialog } from './model/delete-dialog.model';

@Injectable({
  providedIn: 'root',
})
export class DeleteDialogService {
  constructor(private dialog: MatDialog) {}

  public open(data: DeleteDialog): Observable<DeleteDialog | undefined> {
    const dialog = this.dialog.open<DeleteDialogComponent, DeleteDialog>(
      DeleteDialogComponent,
      {
        data,
        minWidth: '250px',
        maxWidth: '521px',
      },
    );

    return dialog.afterClosed();
  }
}
