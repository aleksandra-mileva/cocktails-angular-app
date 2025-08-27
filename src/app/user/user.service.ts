import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription, tap} from 'rxjs';
import {UserLoginResponse} from '../types/userLoginResponse';
import {UserRegisterRequest} from '../types/userRegisterRequest';
import {UserLoginRequest} from '../types/userLoginRequest';
import {AuthoritiesEnum} from '../types/enums/authorities-enum';
import {UserEdit} from '../types/userEdit';
import {UserView} from '../types/userView';
import {PagedModel} from '../types/pagedModel';
import {CocktailView} from '../types/cocktailView';

@Injectable({ providedIn: 'root' })
export class UserService implements OnDestroy {

  private user$$ = new BehaviorSubject<UserLoginResponse | null>(null);

  user: UserLoginResponse | null = null;
  private userSubscription: Subscription;

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$$.subscribe(user => {
      this.user = user;
    });

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user$$.next(JSON.parse(savedUser));
    }
  }

  get isLogged(): boolean {
    return this.user !== null;
  }

  get isAdmin(): boolean {
    return this.user !== null && this.user.authorities.includes(AuthoritiesEnum.ADMIN);
  }

  login(userLoginRequest: UserLoginRequest) {
    return this.http
      .post<UserLoginResponse>('/api/auth/login', userLoginRequest)
      .pipe(
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          this.user$$.next(user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.user$$.next(null);
  }

  register(userRegisterRequest: UserRegisterRequest) {
    return this.http.post('/api/auth/register', userRegisterRequest);
  }

  favouriteCocktail(cocktailId: string) {
    return this.http.post<boolean>(`/api/users/favourites/${cocktailId}`, {});
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  getProfile(id: string) {
    return this.http.get<UserView>(`/api/users/${id}`);
  }

  updateProfile(id: string, userEdit: UserEdit) {
    return this.http.put<UserView>(`/api/users/${id}`, userEdit);
  }

  getUserAddedCocktails(id: string, params: HttpParams): Observable<PagedModel<CocktailView>> {
    return this.http.get<PagedModel<CocktailView>>(`/api/users/${id}/cocktails`, { params });
  }

  getUserFavouriteCocktails(id: string, params: HttpParams): Observable<PagedModel<CocktailView>> {
    return this.http.get<PagedModel<CocktailView>>(`/api/users/${id}/favorites`, { params });
  }
}
