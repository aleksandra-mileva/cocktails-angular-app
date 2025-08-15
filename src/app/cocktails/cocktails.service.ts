import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PagedModel} from '../types/pagedModel';
import {CocktailView} from '../types/cocktailView';
import {delay, dematerialize, materialize, Observable} from 'rxjs';
import {CocktailDetailsView} from '../types/cocktailDetailsView';
import {CocktailFormOptions} from '../types/cocktailFormOptions';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {

  constructor(private http: HttpClient) {
  }

  searchCocktails(params: HttpParams): Observable<PagedModel<CocktailView>> {
    return this.http.get<PagedModel<CocktailView>>('/api/cocktails/search', { params });
  }

  getSingleCocktail(id: string) {
    return this.http.get<CocktailDetailsView>(`/api/cocktails/${id}`);
  }

  createCocktail(formData: FormData) {
    return this.http.post<CocktailDetailsView>('/api/cocktails', formData).pipe(
      materialize(),
      delay(2000),
      dematerialize()
    );
  }

  updateCocktail(id: string, formData: FormData) {
    return this.http.put<CocktailDetailsView>(`/api/cocktails/${id}`, formData).pipe(
      materialize(),
      delay(2000),
      dematerialize()
    );
  }

  deleteCocktail(id: string): Observable<void> {
    return this.http.delete<void>(`/api/cocktails/${id}`)
      .pipe(delay(2000));
  }

  getFormOptions(): Observable<CocktailFormOptions> {
    return this.http.get<CocktailFormOptions>('/api/cocktails/options')
      .pipe(delay(2000));
  }
}
