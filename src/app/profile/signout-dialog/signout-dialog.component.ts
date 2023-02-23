import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbDialogRef } from '@nebular/theme';

@Component({
  templateUrl: './signout-dialog.component.html',
  styleUrls: ['./signout-dialog.component.scss'],
})
export class SignoutDialogComponent {
  message: string = 'Are You Sure?';
  confirmBtnTxt = 'Yes';
  cancelBtnTxt = 'Cancel';

  constructor(private dialogNbRef: NbDialogRef<SignoutDialogComponent>) {}

  onConfirmClick() {
    this.dialogNbRef.close(true);
  }

  close() {
    this.dialogNbRef.close();
  }
}
