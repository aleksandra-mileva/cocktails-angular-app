import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CocktailListComponent} from './cocktails/cocktail-list/cocktail-list.component';
import {CocktailDetailsComponent} from './cocktails/cocktail-details/cocktail-details.component';
import {CocktailSearchComponent} from './cocktails/cocktail-search/cocktail-search.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {CocktailAddComponent} from './cocktails/cocktail-add/cocktail-add.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {CocktailUpdateComponent} from './cocktails/cocktail-update/cocktail-update.component';
import {LoaderComponent} from './shared/loader/loader.component';
import {ErrorPageComponent} from './error/error-page.component';
import {ProfileComponent} from './user/profile/profile.component';
import {AddedCocktailsComponent} from './user/added-cocktails/added-cocktails.component';
import {FavouriteCocktailsComponent} from './user/favourite-cocktails/favourite-cocktails.component';
import {StatisticsComponent} from './statistics/statistics.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},

  {
    path: 'users', children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'profile/:userId', component: ProfileComponent},
      {path: 'profile/:userId/addedCocktails', component: AddedCocktailsComponent},
      {path: 'profile/:userId/favoriteCocktails', component: FavouriteCocktailsComponent}
    ]
  },

  {
    path: 'cocktails',
    children: [
      {path: 'all', component: CocktailListComponent},
      {path: 'search', component: CocktailSearchComponent},
      {path: 'details/:cocktailId', component: CocktailDetailsComponent},
      {path: 'spirit/:spirit', component: CocktailListComponent},
      {path: 'add', component: CocktailAddComponent, canActivate: [AuthGuard] },
      {path: ':cocktailId/edit', component: CocktailUpdateComponent, canActivate: [AuthGuard]}
    ]
  },

  {path: 'loader', component: LoaderComponent},
  {path: 'statistics', component: StatisticsComponent},
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error', pathMatch: 'full', }
];
