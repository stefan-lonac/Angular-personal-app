import { Component, OnInit } from '@angular/core';
import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { map } from 'rxjs';
import { animationList } from '../assets/animation-list';

import { ItemFilters } from '../item-filter.enum';
import { Items } from '../item.model';
import { ItemsSevice } from '../item.service';

@Component({
  selector: 'todo-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  animations: [animationList],
})
export class ItemListComponent implements OnInit {
  id: number;
  items: Items[];
  itemsLength: number;
  editingId: string | null = null;
  title = '';
  description = '';
  ItemFilters = ItemFilters;
  filter = 'all';
  loading: boolean = true;
  selectedItem = '';
  // colorHighlight var
  color = '';

  constructor(
    private itemsService: ItemsSevice,
    private nbToastr: NbToastrService
  ) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() {
    this.itemsService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id_main: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data: Items[]) => {
        var filterValue = this.filter;
        let itemsLength: number;
        this.loading = false;

        if (filterValue === ItemFilters.active) {
          this.items = data.filter((item) => !item.done);
          itemsLength = this.items.length;
        } else if (filterValue === ItemFilters.completed) {
          this.items = data.filter((item) => item.done);
          itemsLength = this.items.length;
        } else if (filterValue === ItemFilters.all) {
          this.items = data;
          itemsLength = this.items.length;
        }
      });
  }

  // When items interactive (add, remove...) this function watch for loop
  // and do interaction only for that item
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

      // this.toastr.success('Added successfully!', 'Item - ' + this.title);
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

  addHighlightColor() {
    this.color = this.selectedItem;

    const data = {
      color: this.color,
      cheched: this.selectedItem,
    };
    localStorage.setItem('table-highlight', JSON.stringify(data));
  }
}
