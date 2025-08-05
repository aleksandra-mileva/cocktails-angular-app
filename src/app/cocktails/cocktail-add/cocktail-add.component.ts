import {Component} from '@angular/core';
import {BackendValidationMap} from '../../types/backendValidationMap';
import {CocktailFormComponent} from '../cocktail-form/cocktail-form.component';
import {ErrorService} from '../../error/error.service';
import {CocktailsService} from '../cocktails.service';
import {Router} from '@angular/router';
import {LoaderComponent} from '../../shared/loader/loader.component';
import {CocktailDetailsView} from '../../types/cocktailDetailsView';

@Component({
  selector: 'app-cocktail-add',
  standalone: true,
  imports: [
    LoaderComponent,
    CocktailFormComponent
  ],
  templateUrl: './cocktail-add.component.html',
  styleUrl: './cocktail-add.component.css'
})
export class CocktailAddComponent {
  isLoading = false;
  errorMap: BackendValidationMap = {};

  constructor(
    private cocktailsService: CocktailsService,
    private errorService: ErrorService,
    private router: Router
  ) {
  }

  createCocktail(formData: FormData): void {
    this.isLoading = true;

    this.cocktailsService.createCocktail(formData).subscribe({
      next: (createdCocktail: CocktailDetailsView) => {
        this.isLoading = false;
        this.router.navigate(['/cocktails/details', createdCocktail.id]);
      },
      error: err => {
        this.isLoading = false;
        this.errorService.handleHttpPostFormError(err, this.errorMap);
      }
    });
  }

}
