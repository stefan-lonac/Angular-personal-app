import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  message: string = 'Are you sure want to delete item ';
  confirmBtnTxt = 'Yes';
  cancelBtnTxt = 'Cancel';
  @Input() title: string;

  constructor(private dialogNbRef: NbDialogRef<DeleteDialogComponent>) {
    this.title;
  }

  submit(value: string) {
    value = this.title;
    this.dialogNbRef.close(value);
  }

  close() {
    this.dialogNbRef.close();
  }
}
