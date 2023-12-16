import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { AuthService } from '../auth/auth.service';
import { Items } from './shared/model/item.model';
import { Observable, map } from 'rxjs';
import { User } from '../auth/login/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsSevice {
  userUid: string;
  items: Items[];
  private dbpath = '/item';
  itemsRef: AngularFirestoreCollection<Items>;
  perPage: number;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
  ) {
    this.itemsRef = this.firestore.collection(this.dbpath);
  }

  getAll(): AngularFirestoreCollection<Items> {
    const userItemsLocal = JSON.parse(localStorage.getItem('user')!);

    return (this.itemsRef = this.firestore.collection(this.dbpath, (ref) =>
      ref.where('user_id', '==', userItemsLocal.uid).orderBy('date', 'desc'),
    ));
  }

  addItem(title: string, description: string) {
    const newItem: Items = {
      id: (Math.random() + 1).toString(36).substring(7),
      user_id: this.authService.user.uid,
      title,
      description,
      done: false,
      date: new Date().toISOString(),
    };
    return this.itemsRef.add({ ...newItem });
  }

  isUserItem(itemID: string): Observable<boolean> {
    const userItemsLocal = JSON.parse(localStorage.getItem('user')!);
    return this.firestore
      .doc<Items>(`${this.dbpath}/${itemID}`)
      .valueChanges()
      .pipe(
        map((item) => {
          return item!.user_id === userItemsLocal.uid;
        }),
      );
  }

  update(id: string, data: object): Promise<void> {
    return this.itemsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.itemsRef.doc(id).delete();
  }

  view(id: string) {
    return this.itemsRef.doc(id);
  }

  perNumPage(value: number) {
    this.perPage = value;
  }
}
