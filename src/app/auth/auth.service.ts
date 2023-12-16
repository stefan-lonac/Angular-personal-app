import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from './login/model/user.model';
import { switchMap, of, map } from 'rxjs';
import { SignoutDialogService } from '../profile/signout-dialog/signout-dialog.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  wrongLogin: boolean = true;
  user: User;
  userRef: AngularFirestoreCollection<User>;
  loading: boolean = false;

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (!user) {
      return false;
    }

    this.afAuth.authState.subscribe((user) => {
      if (!user) {
        return;
      }

      this.userRef = this.afs.collection('login', (ref) =>
        ref.where('uid', '==', user.uid).orderBy('date', 'desc'),
      );
      this.getUser(user.uid);
    });

    return true;
  }

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private _signoutDialogService: SignoutDialogService,
  ) {}

  getUser(id: string) {
    return this.afs
      .collection('login')
      .doc(id)
      .valueChanges()
      .pipe(
        map((user) => {
          if (!user) {
            return;
          }

          this.user = user as User;
          localStorage.setItem('user', JSON.stringify(user));
          JSON.parse(localStorage.getItem('user')!);
        }),
      )
      .subscribe();
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.loading = true;
            this.getUser(user.uid);
            localStorage.setItem('user', JSON.stringify(this.user));
            setTimeout(() => {
              this.loading = false;
              this.router.navigate(['todos']);
            }, 800);
            this.wrongLogin = true;
          }
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        if (errorCode) {
          this.wrongLogin = false;
        }
      });
  }

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['login']);
        }, 800);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `login/${user.uid}`,
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  update(id: string, data: object): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`login/${id}`);
    return userRef.set(data, { merge: true });
  }

  signOut() {
    this._signoutDialogService.open(true).subscribe(() => {
      return this.router.navigate(['login']), localStorage.removeItem('user');
    });
  }
}
