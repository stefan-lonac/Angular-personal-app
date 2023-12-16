import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Items } from '../shared/model/item.model';
import { ItemsSevice } from '../item.service';
import { Observable, of, take } from 'rxjs';
import { RouterParams } from 'src/app/consts/router-params';

export const ItemResolver: ResolveFn<Observable<Items | undefined> | null> = (
  route: ActivatedRouteSnapshot,
) => {
  const itemsService = inject(ItemsSevice);
  const itemId = route.paramMap.get(RouterParams.ItemId);

  return itemsService.view(itemId!).valueChanges();
};
