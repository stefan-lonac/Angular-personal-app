import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { AuthService } from '../auth.service';
import { User } from '../login/user';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnChanges {
  IMAGE_ROOT = '/assets/img/';
  user: User;
  profileForm: FormGroup;
  editMode: boolean;
  emailName: any;
  defaultImg: string =
    'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png';

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private nbToastr: NbToastrService
  ) {}

  ngOnChanges(): void {}

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
      this.authService.userData = this.profileForm.value;

      this.authService
        .update(this.user.uid, this.profileForm.value)
        .then(() => {
          // Show popup after Edit Prfile
          this.nbToastr.show(``, `Profile edited successfully!`, {
            status: 'success',
            position: NbGlobalLogicalPosition.BOTTOM_END,
            limit: 3,
            duration: 3000,
          });
          this.authService.SetUserData(this.authService.userData);
          localStorage.setItem(
            'user',
            JSON.stringify(this.authService.userData)
          );
        })
        .catch((err) => console.log(err));
      this.editMode = false;
    }
  }

  onEditMode() {
    this.editMode = true;
    this.userGet;
    this.formGet;
  }

  cancelEdit() {
    this.editMode = false;
  }

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
}
