import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
} from '@angular/router';
import { map, take } from 'rxjs';
import { RouterParams } from 'src/app/consts/router-params';
import { ItemsSevice } from 'src/app/item/item.service';
import { User } from '../login/model/user.model';

export const isOwnTodoItem: CanActivateFn = (
  activatedRoute: ActivatedRouteSnapshot,
) => {
  const router = inject(Router);
  const itemsService = inject(ItemsSevice);
  const itemId = activatedRoute.paramMap.get(RouterParams.ItemId);
  const isUserItem = itemsService.isUserItem(itemId!).pipe(
    map((isUserItem) => {
      if (isUserItem) {
        return true;
      }

      router.navigate(['']);
      return false;
    }),
  );

  return isUserItem;
};
