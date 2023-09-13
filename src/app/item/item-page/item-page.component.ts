import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { map, Observable, Subject, Subscription, switchMap, tap } from 'rxjs';
import { Items } from '../shared/model/item.model';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbGlobalLogicalPosition,
  NbIconModule,
  NbSpinnerModule,
  NbToastrService,
} from '@nebular/theme';
import { ItemsSevice } from '../item.service';

@Component({
  selector: 'item',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
  standalone: true,
  imports: [
    NbButtonModule,
    NbIconModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    NbCheckboxModule,
    NbSpinnerModule,
    CommonModule,
  ],
})
export class ItemPageComponent implements OnInit {
  item?: Items;
  itemId: string | null;
  editMode: boolean = false;
  itemForm: FormGroup;
  checked?: boolean;
  loading: boolean = true;
  items$: Observable<Items | undefined>;

  constructor(
    private itemsService: ItemsSevice,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private nbToastr: NbToastrService,
    private location: Location
  ) {}

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) {
      this.items$ = this.itemsService
        .getAll()
        .doc<Items>(this.itemId!)
        .valueChanges();

      this.itemForm = this.formBuilder.group({
        title: [this.item?.title],
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
      this.item = this.itemForm.value;
      this.itemsService.update(this.itemId, dataItem);
      this.editMode = false;
      // Show popup after edit Item
      this.nbToastr.show(
        `Item - ${dataItem.title}`,
        `Item edited successfully!`,
        {
          status: 'success',
          position: NbGlobalLogicalPosition.BOTTOM_END,
          limit: 3,
          duration: 2000,
        }
      );
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

  toggleChecked(checked: boolean) {
    this.checked = checked;
  }

  cancelEdit() {
    this.editMode = false;
  }

  back() {
    this.location.back();
  }
}
