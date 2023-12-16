import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialog } from './model/delete-dialog.model';

@Component({
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialog,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
  ) {}

  protected message: string = 'Are you sure want to delete item ';
  protected confirmBtnTxt: string = 'Yes';
  protected cancelBtnTxt: string = 'Cancel';

  submit(value: string) {
    value = this.data.title;
    this.dialogRef.close(value);
  }
}
