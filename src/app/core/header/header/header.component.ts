import {Component} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../../user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatMenuTrigger,
    MatMenu,
    MatButton,
    RouterLink,
    MatMenuItem,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private userService: UserService, private router: Router) {
  }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get isAdmin(): boolean {
    return this.userService.isAdmin;
  }

  get username(): string {
    const user = this.userService.user;
    return user ? `${user.username}` : '';
  }

  get userId(): number | null {
    const user = this.userService.user;
    return user ? user.id : null;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/users/login']);
  }
}
