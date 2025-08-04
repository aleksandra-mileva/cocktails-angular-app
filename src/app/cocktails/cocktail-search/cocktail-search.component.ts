import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CocktailFormOptions} from '../../types/cocktailFormOptions';
import {CocktailView} from '../../types/cocktailView';
import {CocktailsService} from '../cocktails.service';
import {ErrorService} from '../../error/error.service';
import {SearchCocktail} from '../../types/searchCocktail';
import {HttpParams} from '@angular/common/http';
import {PagedModel} from '../../types/pagedModel';
import {wholeNumberBiggerThenValidator} from '../../shared/validators/whole-number-bigger-then.validator';
import {toHttpParams} from '../../shared/utils/toHttpParams';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {CocktailCardComponent} from '../cocktail-card/cocktail-card.component';
import {PaginationComponent} from '../../pagination/pagination.component';
import {LoaderComponent} from '../../shared/loader/loader.component';

@Component({
  selector: 'app-cocktail-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCard,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    MatProgressSpinner,
    CocktailCardComponent,
    PaginationComponent,
    LoaderComponent,
  ],
  templateUrl: './cocktail-search.component.html',
  styleUrls: ['./cocktail-search.component.css']
})
export class CocktailSearchComponent implements OnInit {
  options: CocktailFormOptions | null = null;
  searchResults: CocktailView[] = [];

  isLoading = true;
  isSearching: boolean = false;
  searchPerformed: boolean = false;

  page: number = 0;
  size: number = 9;
  totalPages: number = 0;
  totalElements: number = 0;

  form = new FormGroup({
    name: new FormControl<number | null>(null, []),
    flavour: new FormControl('', []),
    type: new FormControl('', []),
    spirit: new FormControl('', []),
    minPercentAlcohol: new FormControl<number | null>(null, [
      wholeNumberBiggerThenValidator(1)
    ]),
    maxPercentAlcohol: new FormControl<number | null>(null, [
      wholeNumberBiggerThenValidator(1)
    ]),

  });

  constructor(
    private cocktailService: CocktailsService,
    private errorService: ErrorService
  ) {
  }

  ngOnInit(): void {
    this.cocktailService.getFormOptions().subscribe({
      next: (opts) => {
        this.options = opts;
        this.isLoading = false;
      },
      error: err => {
        this.errorService.navigateToErrorPage(err);
        this.isLoading = false;
      }
    });
  }

  fetchCocktails(page: number = 0): void {
    if (this.form.invalid) {
      return;
    }

    this.isSearching = true;
    this.page = page;

    const cocktailSearch: SearchCocktail = this.form.value as SearchCocktail;

    const paramsObj = toHttpParams(cocktailSearch);
    paramsObj['page'] = this.page.toString();
    paramsObj['size'] = this.size.toString();

    const params = new HttpParams({fromObject: paramsObj});

    this.cocktailService.searchCocktails(params).subscribe({
      next: (results: PagedModel<CocktailView>) => {
        this.isSearching = false;
        this.searchPerformed = true;
        this.searchResults = results.content;
        this.totalPages = results.page.totalPages;
        this.page = results.page.number;
        this.totalElements = results.page.totalElements;
      },
      error: err => {
        this.errorService.navigateToErrorPage(err);
      }
    });
  }

  loadCocktails(newPage: number): void {
    this.fetchCocktails(newPage);
  }
}
