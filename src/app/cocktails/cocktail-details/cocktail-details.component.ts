import {Component, OnInit} from '@angular/core';
import {CocktailDetailsView} from '../../types/cocktailDetailsView';
import {MatIcon} from '@angular/material/icon';
import {TitleCasePipe} from '@angular/common';
import {SafeUrlPipe} from '../../shared/pipes/safe-url.pipe';
import {MatButtonModule} from '@angular/material/button';
import {CommentsListComponent} from '../../comments/comments-list/comments-list.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from '../../error/error.service';
import {CocktailsService} from '../cocktails.service';
import {CocktailView} from '../../types/cocktailView';
import {ConfirmationModalComponent} from '../../shared/confirmation-modal/confirmation-modal.component';
import {UserService} from '../../user/user.service';
import {LoaderComponent} from '../../shared/loader/loader.component';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [
    MatIcon,
    TitleCasePipe,
    SafeUrlPipe,
    MatButtonModule,
    CommentsListComponent,
    ConfirmationModalComponent,
    LoaderComponent
  ],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.css'
})
export class CocktailDetailsComponent implements OnInit {
  cocktail!: CocktailDetailsView;
  cocktailId: string = '';
  isLoading: boolean = true;
  showConfirmModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private errorService: ErrorService,
    private cocktailService: CocktailsService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.cocktailId = this.route.snapshot.params['cocktailId'];
    console.log(this.cocktailId);
    this.fetchCocktailDetails();
  }

  deleteCocktail(): void {
    this.isLoading = true;

    this.cocktailService.deleteCocktail(this.cocktailId).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/cocktails/all']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorService.navigateToErrorPage(err);
      }
    });
  }

  goToEdit(cocktail: CocktailView): void {
    this.router.navigate(['/cocktails', cocktail.id, 'edit'], {state: {cocktail}});
  }

  openDeleteModal(): void {
    this.showConfirmModal = true;
  }

  handleCancel(): void {
    this.showConfirmModal = false;
  }

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  private fetchCocktailDetails(): void {
    this.cocktailService.getSingleCocktail(this.cocktailId).subscribe({
      next: (cocktail) => {
        this.cocktail = cocktail;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorService.navigateToErrorPage(err);
      }
    });
  }

}
