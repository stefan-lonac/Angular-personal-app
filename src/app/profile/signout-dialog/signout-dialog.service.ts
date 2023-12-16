import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SignoutDialogComponent } from './signout-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SignoutDialogService {
  constructor(private dialog: MatDialog) {}

  public open(data: boolean): Observable<boolean | undefined> {
    const dialog = this.dialog.open<SignoutDialogComponent, boolean>(
      SignoutDialogComponent,
      {
        data,
        minWidth: '250px',
        maxWidth: '521px',
      },
    );

    return dialog.afterClosed();
  }
}
