import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map } from 'rxjs';
import { ItemsSevice } from 'src/app/item/item.service';
import { Items } from '../item.model';
import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'item',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
})
export class ItemPageComponent implements OnInit {
  item?: Items;
  itemId: string | null;
  editMode: boolean = false;
  itemForm: FormGroup;
  checked?: boolean;

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
      this.itemsService
        .getAll()
        .doc(this.itemId!)
        .valueChanges()
        .pipe(
          map((values) => {
            this.item = values;
          })
        )
        .subscribe((data) => {
          this.item == data;
        });

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
