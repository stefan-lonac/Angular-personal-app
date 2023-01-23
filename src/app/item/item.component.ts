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
import { Items } from './item.model';
import { ToastrService } from 'ngx-toastr';
import {
  faEye,
  faPenToSquare,
  faTrashCan,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {
  NbDialogService,
  NbGlobalLogicalPosition,
  NbToastrService,
} from '@nebular/theme';

@Component({
  selector: '[todo-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
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
    this.router.navigate(['todos/item/', this.itemCurrent.id_main]);
  }

  onDelete() {
    const dialogRef = this.dialogNbService.open(DeleteDialogComponent, {
      closeOnBackdropClick: false,
      context: { title: this.items.title },
    });

    // Open Material Dialog and choose if you wont to delete or not
    dialogRef.onClose.subscribe((data) => {
      if (this.itemCurrent.id_main && data) {
        // Afer delete show popup with message
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

      // Show popup after Start Edit Mode Item
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
    // After edit Item input field set to text
    this.setEdittingMode.emit(null);
    const data = {
      title: this.changeTitle,
    };

    if (this.itemCurrent.id_main) {
      // Show popup after edit Item
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
