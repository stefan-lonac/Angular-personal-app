import { Component, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EmptyTextPipe } from '../shared/pipe/empty-text.pipe';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/login/model/user.model';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    EmptyTextPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
})
export class ProfileComponent implements OnInit {
  IMAGE_ROOT = '/assets/img/';
  protected user: User;
  protected profileForm: FormGroup;
  protected editMode: boolean;
  protected emailName: string;
  protected defaultImg: string =
    'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png';
  protected isSaved = true;

  private get formGet() {
    return (this.profileForm = this.formBuilder.group({
      displayName: [this.user.displayName || this.emailName],
      role: [this.user.role],
      location: [this.user.location],
    }));
  }

  private get userGet() {
    const userGet = JSON.parse(localStorage.getItem('user')!);
    return (this.user = { ...userGet });
  }

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.userGet;
      this.formGet;
      const useEmailName = this.user.email.split(/@(?=[^@]*$)/);
      this.emailName = useEmailName[0];
    }
  }

  onUpdate() {
    if (this.user.uid) {
      this.authService
        .update(this.user.uid, this.profileForm.value)
        .then(() => {
          this._snackBar.open(`Profile edited successfully!`, ``, {
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
            duration: 2000,
          });

          this.authService.SetUserData(this.profileForm.value);
          localStorage.setItem('user', JSON.stringify(this.profileForm.value));
        })
        .catch((err) => console.log(err));
      this.editMode = false;
      this.isSaved = true;
    }
  }

  onEditMode() {
    this.editMode = true;
    this.userGet;
    this.formGet;
    this.isSaved = false;
  }

  cancelEdit() {
    this.editMode = false;
    this.isSaved = true;
  }

  public canDeactivateEdit() {
    if (!this.isSaved) {
      return false;
    }

    return true;
  }
}
