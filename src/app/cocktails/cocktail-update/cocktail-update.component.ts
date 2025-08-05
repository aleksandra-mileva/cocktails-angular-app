import {Component, OnInit, ViewChild} from '@angular/core';
import {CocktailAddOrEdit} from '../../types/cocktailAddOrEdit';
import {BackendValidationMap} from '../../types/backendValidationMap';
import {CocktailFormComponent} from '../cocktail-form/cocktail-form.component';
import {CocktailsService} from '../cocktails.service';
import {ErrorService} from '../../error/error.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CocktailDetailsView} from '../../types/cocktailDetailsView';
import {LoaderComponent} from '../../shared/loader/loader.component';

@Component({
  selector: 'app-cocktail-update',
  standalone: true,
  imports: [
    CocktailFormComponent,
    LoaderComponent
  ],
  templateUrl: './cocktail-update.component.html',
  styleUrl: './cocktail-update.component.css'
})
export class CocktailUpdateComponent implements OnInit {

  cocktailId: string = '';
  currentCocktail: CocktailAddOrEdit | null = null;
  errorMap: BackendValidationMap = {};
  isLoading = true;

  @ViewChild(CocktailFormComponent) offerForm!: CocktailFormComponent;

  constructor(
    private cocktailsService: CocktailsService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.cocktailId = this.route.snapshot.params['cocktailId'];

    this.cocktailsService.getSingleCocktail(this.cocktailId).subscribe({
      next: (cocktail: CocktailDetailsView) => {
        this.currentCocktail = {
          name: cocktail.name,
          ingredients: cocktail.ingredients.join('\n'),
          preparation: cocktail.preparation,
          flavour: cocktail.flavour,
          videoUrl: cocktail.videoUrl,
          type: cocktail.type,
          spirit: cocktail.spirit,
          percentAlcohol: cocktail.percentAlcohol,
          servings: cocktail.servings
        };
        this.isLoading = false;
      },
      error: err => {
        this.errorService.navigateToErrorPage(err);
        this.isLoading = false;
      }
    });
  }

  save(formData: FormData): void {
    this.isLoading = true;

    this.cocktailsService.updateCocktail(this.cocktailId, formData).subscribe({
      next: (updatedCocktail: CocktailDetailsView) => {
        this.router.navigate(['/cocktails/details', updatedCocktail.id]);
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
        this.errorService.handleHttpPostFormError(err, this.errorMap);
      }
    });
  }
}
