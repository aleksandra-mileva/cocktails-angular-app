import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {emailValidator} from '../../shared/validators/email.validator';
import {DOMAINS} from '../../constants';
import {BackendValidationMap} from '../../types/backendValidationMap';
import {ErrorService} from '../../error/error.service';
import {ActivatedRoute} from '@angular/router';
import {UserView} from '../../types/userView';
import {LoaderComponent} from '../../shared/loader/loader.component';
import {UserEdit} from '../../types/userEdit';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  userId: string = '';
  user: UserView | null = null;
  isEditMode = false;
  errorMap: BackendValidationMap = {};
  isLoading = true;

  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    email: new FormControl('', [
      Validators.required, emailValidator(DOMAINS)
    ]),
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];

    this.userService.getProfile(this.userId).subscribe({
      next: (user: UserView) => {
        this.user = user;
        this.form.patchValue(this.user);
        this.isLoading = false;

        // Clear backend errors when user types
        ['firstName', 'lastName', 'username', 'email'].forEach(field => {
          this.form.get(field)?.valueChanges.subscribe(() => {
            if (this.errorMap[field]) delete this.errorMap[field];
          });
        });
      },
      error: err => {
        this.errorService.navigateToErrorPage(err);
        this.isLoading = false;
      }
    });
  }

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;

    if (this.user) {
      this.form.patchValue(this.user);
    }
  }

  saveProfile(): void {
    if (this.form.invalid || !this.user) {
      this.form.markAllAsTouched();
      return;
    }

    const dto = this.form.value as UserEdit;

    this.isLoading = true;

    this.userService.updateProfile(this.userId, dto).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.isEditMode = false;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorService.handleHttpPostFormError(err, this.errorMap);
      }
    });
  }
}
