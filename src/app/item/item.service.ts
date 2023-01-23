import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { AuthService } from '../auth.service';
import { Items } from './item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsSevice {
  userUid: string;
  itemsObject: any;
  items: Items[];
  private dbpath = '/item';
  itemsRef: AngularFirestoreCollection<Items>;
  perPage: number = 5;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {}

  getAll(): AngularFirestoreCollection<Items> {
    const userItemsLocal = JSON.parse(localStorage.getItem('user')!);
    return (this.itemsRef = this.firestore.collection(this.dbpath, (ref) =>
      ref.where('user_id', '==', userItemsLocal.uid).orderBy('date', 'desc')
    ));
  }

  addItem(title: string, description: string) {
    const newItem: Items = {
      id: (Math.random() + 1).toString(36).substring(7),
      user_id: this.authService.userData.uid,
      title,
      description,
      done: false,
      date: new Date().toISOString(),
    };
    return this.itemsRef.add({ ...newItem });
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
    console.log(this.perPage);
  }
}
