import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ItemsSevice } from './item.service';
import { Items } from './shared/model/item.model';
import {
  faEye,
  faPenToSquare,
  faTrashCan,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  NbCheckboxModule,
  NbDialogService,
  NbGlobalLogicalPosition,
  NbIconModule,
  NbToastrService,
} from '@nebular/theme';
import { Router } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ApplicationRoutes } from '../consts/application-routes';

@Component({
  selector: '[todo-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  standalone: true,
  imports: [
    NbCheckboxModule,
    NbEvaIconsModule,
    NbIconModule,
    FontAwesomeModule,
    CommonModule,
  ],
})
export class ItemComponent implements OnInit {
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
    private nbToastr: NbToastrService,
    private router: Router,
    private dialogNbService: NbDialogService
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.itemCurrent = { ...this.items };
  }

  onView() {
    this.router.navigate([
      ApplicationRoutes.Todos._Base,
      ApplicationRoutes.Todos.ItemDetails,
      this.itemCurrent.id_main,
    ]);
  }

  onDelete() {
    const dialogRef = this.dialogNbService.open(DeleteDialogComponent, {
      closeOnBackdropClick: false,
      context: { title: this.items.title },
    });

    dialogRef.onClose.subscribe((data) => {
      if (this.itemCurrent.id_main && data) {
        this.nbToastr.show(
          `Item - ${this.itemCurrent.title}`,
          `Remove successfully!`,
          {
            status: 'success',
            position: NbGlobalLogicalPosition.BOTTOM_END,
            limit: 3,
            duration: 2000,
          }
        );
        this.itemsService.delete(this.itemCurrent.id_main);
      }
    });
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

      this.nbToastr.show(`Edit Mode`, `Hit Enter if you wont to save changes`, {
        status: 'info',
        position: NbGlobalLogicalPosition.BOTTOM_END,
        limit: 3,
        duration: 3500,
      });
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
      this.nbToastr.show(`Item - ${data.title}`, `Edited!`, {
        status: 'success',
        position: NbGlobalLogicalPosition.BOTTOM_END,
        limit: 3,
        duration: 2000,
      });
      this.itemsService.update(this.itemCurrent.id_main, data);
    }
  }
}
