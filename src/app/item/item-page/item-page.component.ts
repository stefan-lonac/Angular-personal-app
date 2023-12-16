import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Items } from '../shared/model/item.model';
import { ItemsSevice } from '../item.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterParams } from 'src/app/consts/router-params';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Nil } from 'src/app/utils/type-guards';

@Component({
  selector: 'item',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
  ],
})
export class ItemPageComponent {
  item?: Items;
  itemId: string | null;
  editMode: boolean = false;
  itemForm = new FormGroup({
    title: new FormControl<string | Nil>(
      this.item?.title!,
      Validators.required,
    ),
    description: new FormControl<string | Nil>(this.item?.description!),
    done: new FormControl<boolean | Nil>(this.item?.done!),
  });
  checked?: boolean;
  loading: boolean = true;
  items$: Observable<Items | undefined>;

  constructor(
    private itemsService: ItemsSevice,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private location: Location,
  ) {
    this.itemId = this.route.snapshot.params[RouterParams.ItemId];

    if (this.itemId) {
      this.items$ = this.itemsService
        .getAll()
        .doc<Items>(this.itemId!)
        .valueChanges();

      this.itemForm = this.formBuilder.group({
        title: [this.item?.title, Validators.required],
        description: [this.item?.description],
        done: [this.item?.done],
      });
    }
  }

  onUpdate() {
    if (this.itemId) {
      const dataItem = {
        title: this.itemForm.value.title,
        description: this.itemForm.value.description,
        done: this.itemForm.value.done,
      };
      // this.item = this.itemForm.value;
      this.itemsService.update(this.itemId, dataItem);
      this.editMode = false;

      this._snackBar.open(`Item - ${dataItem.title}`, `Edited successfully!`, {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 2000,
      });
    }
  }

  onEditMode() {
    this.checked = this.item?.done;
    this.editMode = true;
    this.itemForm = this.formBuilder.group({
      title: [this.item?.title],
      description: [this.item?.description],
      done: [this.item?.done],
    });
  }

  toggleChecked(checked: MatCheckboxChange) {
    this.checked = checked.checked;
  }

  cancelEdit() {
    this.editMode = false;
  }

  back() {
    this.location.back();
  }
}
