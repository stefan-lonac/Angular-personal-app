import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  templateUrl: './signout-dialog.component.html',
  styleUrls: ['./signout-dialog.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class SignoutDialogComponent {
  message: string = 'Are You Sure?';
  confirmBtnTxt = 'Yes';
  cancelBtnTxt = 'Cancel';

  constructor(private dialogNbRef: MatDialogRef<SignoutDialogComponent>) {}

  onConfirmClick() {
    this.dialogNbRef.close(true);
  }

  close() {
    this.dialogNbRef.close();
  }
}
