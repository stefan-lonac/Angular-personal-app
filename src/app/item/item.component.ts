import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { of, switchMap } from 'rxjs';
import { ItemsSevice } from './item.service';
import { Items } from './shared/model/item.model';
import {
  faEye,
  faPenToSquare,
  faTrashCan,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ApplicationRoutes } from '../consts/application-routes';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteDialogService } from './delete-dialog/delete-dialog.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: '[todo-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    MatSnackBarModule,
    MatCheckboxModule,
  ],
})
export class ItemComponent {
  @Input() items: Items;
  @Input() index: number;
  @Input('isEditing') isEditingProps: boolean;
  @Output('setEditModeId') setEdittingMode: EventEmitter<string | null> =
    new EventEmitter();
  @ViewChild('titleInput') titleInput: ElementRef;
  isDone: boolean;
  changeTitle: string = '';
  itemCurrent: any;
  isEdit: boolean = false;
  // FontAwesome icons
  faTrash = faTrashCan;
  faEdit = faPenToSquare;
  faClose = faXmark;
  faView = faEye;

  constructor(
    private itemsService: ItemsSevice,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _deleteServiceDialog: DeleteDialogService,
  ) {}

  ngOnChanges() {
    this.itemCurrent = { ...this.items };
  }

  onView() {
    this.router.navigate([
      ApplicationRoutes.Item._Base,
      this.itemCurrent.id_main,
    ]);
  }

  onDelete() {
    this._deleteServiceDialog
      .open({ title: this.items.title })
      .pipe(
        switchMap((response) => {
          if (!this.itemCurrent.id_main && !response) {
            return of(null);
          }

          this._snackBar.open(
            `Item - ${this.itemCurrent.title}`,
            `Remove successfully!`,
            {
              horizontalPosition: 'start',
              verticalPosition: 'bottom',
              duration: 2000,
            },
          );

          return this.itemsService.delete(this.itemCurrent.id_main);
        }),
      )
      .subscribe();
  }

  changeStatus() {
    this.items.done = !this.items.done;
    const data = {
      done: this.items.done,
    };

    if (this.itemCurrent.id_main) {
      this.itemsService
        .update(this.itemCurrent.id_main, data)
        .then(() => {})
        .catch((err) => err);
    }
  }

  onEditMode() {
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.setEdittingMode.emit(this.items.id);

      this._snackBar.open(
        `Edit Mode`,
        `Hit Enter if you wont to save changes`,
        {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          duration: 2000,
        },
      );
    } else {
      this.setEdittingMode.emit(null);
    }
  }

  updateItem(event: Event): void {
    const value = <HTMLInputElement>event.target;
    this.changeTitle = value.value;
  }

  onUpdateItem(): void {
    this.setEdittingMode.emit(null);
    const data = {
      title: this.changeTitle,
    };

    if (this.itemCurrent.id_main) {
      this._snackBar.open(`Item - ${data.title}`, `Edited!`, {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 2000,
      });
      this.itemsService.update(this.itemCurrent.id_main, data);
    }
  }
}
