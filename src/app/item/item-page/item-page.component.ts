import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { ItemsSevice } from 'src/app/item/item.service';
import { Items } from '../item.model';

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
    private toastr: ToastrService
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
      // Show popup after edit Item
      this.toastr.success('Item edited successfully!', '', {
        timeOut: 3000,
        extendedTimeOut: 1000,
        progressBar: true,
        tapToDismiss: true,
      });
      this.item = this.itemForm.value;
      this.itemsService.update(this.itemId, dataItem);
      this.editMode = false;
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
    console.log(checked);
  }
}
