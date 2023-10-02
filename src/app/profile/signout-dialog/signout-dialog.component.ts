import { Component } from '@angular/core';
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
