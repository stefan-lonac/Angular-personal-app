import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  submitted = false;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.ConfirmedValidator('password', 'confirmPassword') },
    );
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.submitted = false;
      this.authService.SignUp(
        this.signUpForm.value.email,
        this.signUpForm.value.password,
      );
    } else {
      this.submitted = true;
    }
  }

  get sUpForm() {
    return this.signUpForm.controls;
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
}
