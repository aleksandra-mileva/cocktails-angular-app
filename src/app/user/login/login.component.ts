import {Component} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {UserLoginRequest} from '../../types/userLoginRequest';
import {LoaderComponent} from '../../shared/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    LoaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  badCredentials: boolean = false;
  isLoading: boolean = false;
  username: string = '';

  constructor(private userService: UserService, private router: Router) {
  }

  login(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;

    const userLoginRequest: UserLoginRequest = form.value;

    this.userService.login(userLoginRequest).subscribe({
      next: () => {
        this.isLoading = false;
        this.badCredentials = false;
        this.router.navigate(['/home']);
      },
      error: () => {
        this.isLoading = false;
        this.badCredentials = true;
      }
    });
  }

  resetBadCredentials() {
    this.badCredentials = false;
  }
}
