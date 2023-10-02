import { Component, OnInit } from '@angular/core';
import {
  NbCardModule,
  NbGlobalLogicalPosition,
  NbInputModule,
  NbRadioModule,
  NbSpinnerModule,
  NbToastrService,
} from '@nebular/theme';
import { map } from 'rxjs';
import { animationList } from '../assets/animation-list';

import { Items } from '../shared/model/item.model';
import { ItemsSevice } from '../item.service';
import { ItemFilters } from '../shared/enums/item-filter.enum';
import { CommonModule } from '@angular/common';
import { SearchItemsPipe } from 'src/app/item/shared/pipe/search-items.pipe';
import { LengthPipe } from 'src/app/shared/pipe/length.pipe';
import { FormsModule } from '@angular/forms';
import { DisableButton } from '../shared/pipe/disable-button.pipe';
import { ItemComponent } from '../item.component';

@Component({
  selector: 'todo-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  animations: [animationList],
  standalone: true,
  imports: [
    NbCardModule,
    CommonModule,
    NbSpinnerModule,
    NbRadioModule,
    SearchItemsPipe,
    LengthPipe,
    FormsModule,
    DisableButton,
    ItemComponent,
    NbInputModule,
  ],
})
export class ItemListComponent implements OnInit {
  id: number;
  items: Items[];
  itemsLength: number;
  editingId: string | null = null;
  title = '';
  description = '';
  ItemFilters = ItemFilters;
  filter: string = 'all';
  loading: boolean = true;
  selectedItem = '';
  searchText: string = '';

  // Slice variable
  // setPerList: any = '5';

  fetchItems$ = this.itemsService
    .getAll()
    .snapshotChanges()
    .pipe(
      map((changes) =>
        changes.map((c) => ({
          id_main: c.payload.doc.id,
          ...c.payload.doc.data(),
        }))
      )
    );

  constructor(
    private itemsService: ItemsSevice,
    private nbToastr: NbToastrService
  ) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() {
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

  trackById(item: any) {
    return item.id;
  }

  cahngeText(event: Event) {
    const target = <HTMLInputElement>event.target;
    this.title = target.value;
    if (this.title.length <= 3) {
      target.disabled;
    }
  }

  onAddItem() {
    if (this.title !== '' && this.title.length >= 3) {
      this.nbToastr.show(`Item - ${this.title}`, `Added successfully!`, {
        status: 'success',
        position: NbGlobalLogicalPosition.BOTTOM_END,
        limit: 3,
      });

      this.itemsService.addItem(this.title, this.description).then(() => {
        this.title = '';
        this.description = '';
      });
    }
  }

  setEditId(id: string | null) {
    this.editingId = id;
  }

  changeFilter(filter: string) {
    this.filter = filter;
    this.fetchItems();
  }
}
