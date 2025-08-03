import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PagedModel} from '../types/pagedModel';
import {CocktailView} from '../types/cocktailView';
import {delay, Observable} from 'rxjs';
import {CocktailDetailsView} from '../types/cocktailDetailsView';
import {CocktailFormOptions} from '../types/cocktailFormOptions';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {

  constructor(private http: HttpClient) {
  }

  searchCocktails(params: HttpParams): Observable<PagedModel<CocktailView>> {
    return this.http.get<PagedModel<CocktailView>>('/api/cocktails/search', { params })
      .pipe(delay(2000));
  }

  getSingleCocktail(id: string) {
    return this.http.get<CocktailDetailsView>(`/api/cocktails/${id}`)
      .pipe(delay(2000));
  }

  // createCocktail(offerAdd: OfferAddOrEdit) {
  //   return this.http.post<OfferView>('/api/offers/add', offerAdd).pipe(
  //     materialize(),
  //     delay(2000),
  //     dematerialize()
  //   );
  // }
  //
  // updateOffer(id: string, offerUpdate: OfferAddOrEdit) {
  //   return this.http.put<OfferView>(`/api/offers/edit/${id}`, offerUpdate).pipe(
  //     materialize(),
  //     delay(2000),
  //     dematerialize()
  //   );
  // }

  deleteCocktail(id: string): Observable<void> {
    return this.http.delete<void>(`/api/cocktails/${id}`)
      .pipe(delay(2000));
  }

  getFormOptions(): Observable<CocktailFormOptions> {
    return this.http.get<CocktailFormOptions>('/api/cocktails/options')
      .pipe(delay(2000));
  }
}
