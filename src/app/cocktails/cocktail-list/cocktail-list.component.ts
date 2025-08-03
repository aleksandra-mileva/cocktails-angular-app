import {Component, OnInit} from '@angular/core';
import {CocktailView} from '../../types/cocktailView';
import {CocktailCardComponent} from '../cocktail-card/cocktail-card.component';
import {CocktailsService} from '../cocktails.service';
import {ErrorService} from '../../error/error.service';
import {HttpParams} from '@angular/common/http';
import {PagedModel} from '../../types/pagedModel';
import {LoaderComponent} from '../../shared/loader/loader.component';
import {PaginationComponent} from '../../pagination/pagination.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [
    CocktailCardComponent,
    LoaderComponent,
    PaginationComponent
  ],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.css'
})
export class CocktailListComponent implements OnInit {
  cocktails: CocktailView[] = [];
  isLoading: boolean = true;
  page: number = 0;
  size: number = 9;
  totalPages: number = 0;
  totalElements: number = 0;
  spiritParam: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private cocktailService: CocktailsService,
    private errorService: ErrorService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.spiritParam = params.get('spirit');
      this.fetchCocktails(this.page);
    });
  }

  fetchCocktails(page: number): void {
    this.isLoading = true;
    this.page = page;

    const paramsObj: Record<string, string> = {};
    paramsObj['page'] = this.page.toString();
    paramsObj['size'] = this.size.toString();

    if (this.spiritParam) {
      paramsObj['spirit'] = this.spiritParam.toUpperCase();
    }

    const params = new HttpParams({fromObject: paramsObj});

    this.cocktailService.searchCocktails(params).subscribe({
      next: (response: PagedModel<CocktailView>) => {
        this.cocktails = response.content;
        this.totalPages = response.page.totalPages;
        this.page = response.page.number;
        this.totalElements = response.page.totalElements;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorService.navigateToErrorPage(err);
      }
    });
  }

  loadCocktails(newPage: number): void {
    this.fetchCocktails(newPage);
  }
}
