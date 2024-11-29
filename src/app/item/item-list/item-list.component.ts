import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs';
import { animationList } from '../assets/animation-list';

import { Items } from '../shared/model/item.model';
import { ItemsSevice } from '../item.service';
import { ItemFilters } from '../shared/enums/item-filter.enum';
import { CommonModule } from '@angular/common';
import { SearchItemsPipe } from 'src/app/item/shared/pipe/search-items.pipe';
import { LengthPipe } from 'src/app/shared/pipe/length.pipe';
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DisableButton } from '../shared/pipe/disable-button.pipe';
import { ItemComponent } from '../item.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

export class AddItemFormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'todo-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  animations: [animationList],
  standalone: true,
  imports: [
    CommonModule,
    SearchItemsPipe,
    LengthPipe,
    FormsModule,
    DisableButton,
    ItemComponent,
    MatCardModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class ItemListComponent implements OnInit {
  protected title = new FormControl<string>('', [
    Validators.required,
    Validators.maxLength(20),
    Validators.minLength(3),
  ]);
  protected description = new FormControl<string>('');
  matcherFrom = new AddItemFormErrorStateMatcher();

  protected items: Items[];
  protected itemsLength: number;
  protected editingId: string | null = null;
  protected isSaved = true;
  protected ItemFilters = ItemFilters;
  protected filter: string = this.ItemFilters.all;
  protected loading: boolean = true;
  protected selectedItem = '';
  protected searchText: string = '';

  private fetchItems$ = this.itemsService
    .getAll()
    .snapshotChanges()
    .pipe(
      map((changes) =>
        changes.map((c) => ({
          id_main: c.payload.doc.id,
          ...c.payload.doc.data(),
        })),
      ),
    );

  constructor(
    private itemsService: ItemsSevice,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  protected fetchItems() {
    this.fetchItems$.subscribe((data: Items[]) => {
      this.loading = false;
      switch (this.filter) {
        case ItemFilters.all: {
          this.items = data;
          this.itemsLength = this.items.length;
          break;
        }
        case ItemFilters.active: {
          this.items = data.filter((item) => !item.done);
          this.itemsLength = this.items.length;
          break;
        }
        case ItemFilters.completed: {
          this.items = data.filter((item) => item.done);
          this.itemsLength = this.items.length;
          break;
        }
      }
    });
  }

  protected trackById(item: any) {
    return item.id;
  }

  protected cahngeText(event: Event) {
    const target = <HTMLInputElement>event.target;

    if (this.title.value!.length <= 3) {
      target.disabled;
    }
  }

  protected onAddItem() {
    if (this.title.value !== '' && this.title.value!.length >= 3) {
      this._snackBar.open(`Item - ${this.title}`, `Added successfully!`, {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });

      this.itemsService.addItem(this.title.value!, this.description.value!);
    }
  }

  protected setEditId(id: string | null) {
    if ((this.editingId = id)) {
      return (this.isSaved = false);
    }

    return (this.isSaved = true);
  }

  protected changeFilter(filter: string) {
    this.filter = filter;
    this.fetchItems();
  }

  public canDeactivateEdit(): boolean {
    if (!this.isSaved) {
      return false;
    }

    return true;
  }
}
