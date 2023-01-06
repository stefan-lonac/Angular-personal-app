import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService
  ) {}

  ngOnChanges(): void {
    localStorage.setItem('user', JSON.stringify(this.authService.userData));
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      const userGet = JSON.parse(localStorage.getItem('user')!);
      this.user = { ...userGet };

      const useEmailName = this.user.email.split(/@(?=[^@]*$)/);
      this.emailName = useEmailName;

      this.profileForm = this.formBuilder.group({
        displayName: [this.user.displayName],
        role: [this.user.role],
        location: [this.user.location],
      });
    }
  }

  onUpdate() {
    if (this.user.uid) {
      this.authService.userData = this.profileForm.value;

      this.authService
        .update(this.user.uid, this.profileForm.value)
        .then(() => {
          // Show popup after Edit Prfile
          this.toastr.success('Profile edited successfully!', '', {
            timeOut: 3000,
            extendedTimeOut: 1000,
            progressBar: true,
            tapToDismiss: true,
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
  }
}
