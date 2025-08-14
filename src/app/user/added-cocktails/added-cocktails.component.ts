import {Component, OnInit} from '@angular/core';
import {CocktailView} from '../../types/cocktailView';
import {ActivatedRoute} from '@angular/router';
import {ErrorService} from '../../error/error.service';
import {HttpParams} from '@angular/common/http';
import {PagedModel} from '../../types/pagedModel';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {UserService} from '../user.service';
import {CocktailCardComponent} from '../../cocktails/cocktail-card/cocktail-card.component';
import {LoaderComponent} from '../../shared/loader/loader.component';

@Component({
  selector: 'app-added-cocktails',
  standalone: true,
  imports: [
    CocktailCardComponent,
    LoaderComponent,
    MatPaginator
  ],
  templateUrl: './added-cocktails.component.html',
  styleUrl: './added-cocktails.component.css'
})
export class AddedCocktailsComponent implements OnInit {
  userId: string = '';
  cocktails: CocktailView[] = [];
  isLoading: boolean = true;
  page: number = 0;
  size: number = 9;
  totalPages: number = 0;
  totalElements: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private errorService: ErrorService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.fetchAddedCocktails(this.userId, this.page);
  }

  fetchAddedCocktails(userId: string, page: number): void {
    this.isLoading = true;
    this.page = page;

    const paramsObj: Record<string, string> = {};
    paramsObj['page'] = this.page.toString();
    paramsObj['size'] = this.size.toString();

    const params = new HttpParams({fromObject: paramsObj});

    this.userService.getUserAddedCocktails(userId, params).subscribe({
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

  loadCocktails(event: PageEvent): void {
    this.size = event.pageSize;
    this.page = event.pageIndex;
    this.fetchAddedCocktails(this.userId, event.pageIndex);
  }
}
