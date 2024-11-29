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
import { Observable, of } from 'rxjs';
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
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule,
  ],
})
export class ItemPageComponent {
  protected item?: Items;
  protected itemId: string | null;
  protected editMode: boolean = false;
  protected isSaved = true;
  protected itemForm = new FormGroup({
    title: new FormControl<string | Nil>(
      this.item?.title!,
      Validators.required,
    ),
    description: new FormControl<string | Nil>(this.item?.description!),
    done: new FormControl<boolean | Nil>(this.item?.done!),
  });
  protected checked?: boolean;
  protected loading: boolean = true;
  protected items$: Observable<Items | undefined>;

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

  onUpdate(): void {
    if (!this.isSaved) {
      this.isSaved = false;
    }

    if (this.itemId) {
      const dataItem = {
        title: this.itemForm.value.title,
        description: this.itemForm.value.description,
        done: this.itemForm.value.done,
      };
      this.itemsService.update(this.itemId, dataItem);
      this.editMode = false;

      this._snackBar.open(`Item - ${dataItem.title}`, `Edited successfully!`, {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 2000,
      });
    }

    this.isSaved = true;
  }

  onEditMode() {
    this.checked = this.item?.done;
    this.editMode = true;
    this.itemForm = this.formBuilder.group({
      title: [this.item?.title],
      description: [this.item?.description],
      done: [this.item?.done],
    });

    this.isSaved = false;
  }

  toggleChecked(checked: MatCheckboxChange) {
    this.checked = checked.checked;
  }

  cancelEdit() {
    this.editMode = false;
    this.isSaved = true;
  }

  back() {
    this.location.back();
  }

  canDeactivateEdit(): boolean {
    if (!this.isSaved) {
      return false;
    }

    return true;
  }
}
