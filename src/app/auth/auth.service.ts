import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from './login/user';
import { SignoutDialogComponent } from '../profile/signout-dialog/signout-dialog.component';
import { NbDialogService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  wrongLogin: boolean = true;
  user: User;
  userRef: AngularFirestoreCollection<User>;
  loading: boolean = false;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private dialogNbService: NbDialogService
  ) {
    if (this.isLoggedIn) {
      // Fetch user loggedin user ID
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.userData = user.uid;
          this.userRef = this.afs.collection('login', (ref) =>
            ref.where('uid', '==', this.userData).orderBy('date', 'desc')
          );
          this.getUser(user.uid);
        }
      });
    } else {
      localStorage.setItem('user', 'null');
    }
  }

  // Get Loggedin User ID and push to the localStorage
  getUser(id: string) {
    return this.afs
      .collection('login')
      .doc(id)
      .valueChanges()
      .subscribe((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        }
      });
  }

  // SignIn function
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.loading = true;
            this.getUser(user.uid);
            localStorage.setItem('user', JSON.stringify(this.userData));
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

  // Check if user login or not
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user?.emailVerified === false ? true : false;
  }

  // Fetch user data from Firebase
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `login/${user.uid}`
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

  // Update Firebase Field
  update(id: string, data: object): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`login/${id}`);
    return userRef.set(data, { merge: true });
  }

  // Remove user from LocalStorage and signOut
  signOut() {
    const dialogRef = this.dialogNbService.open(SignoutDialogComponent, {
      closeOnBackdropClick: false,
    });

    // Open Nebular Dialog and choose if you wont to signout or not
    dialogRef.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      }
    });
  }
}
