import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-signout-dialog',
  templateUrl: './signout-dialog.component.html',
  styleUrls: ['./signout-dialog.component.scss'],
})
export class SignoutDialogComponent implements OnInit {
  message: string = 'Are You Sure?';
  confirmBtnTxt = 'Yes';
  cancelBtnTxt = 'Cancel';
  //  TODO Change dialog from Material to Nebular
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SignoutDialogComponent>
  ) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmBtnTxt = data.buttonText.ok || this.confirmBtnTxt;
        this.cancelBtnTxt = data.buttonText.cancel || this.cancelBtnTxt;
      }
    }
  }

  ngOnInit(): void {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
