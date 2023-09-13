import { Pipe, PipeTransform } from '@angular/core';
import { Items } from '../model/item.model';

@Pipe({
  name: 'searchItems',
  standalone: true,
})
export class SearchItemsPipe implements PipeTransform {
  transform(items: Items[], searchText: string): Items[] {
    if (!items) {
      return [];
    }

    if (!searchText) {
      return items;
    }

    searchText = searchText.toLocaleLowerCase();

    return items.filter((data) => {
      return data.title.toLocaleLowerCase().includes(searchText);
    });
  }
}
