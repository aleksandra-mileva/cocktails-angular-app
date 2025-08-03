import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CocktailListComponent} from './cocktails/cocktail-list/cocktail-list.component';
import {CocktailDetailsComponent} from './cocktails/cocktail-details/cocktail-details.component';
import {CocktailSearchComponent} from './cocktails/cocktail-search/cocktail-search.component';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},

  {
    path: 'users', children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  },

  {
    path: 'cocktails',
    children: [
      {path: 'all', component: CocktailListComponent},
      {path: 'search', component: CocktailSearchComponent},
      {path: 'details/:cocktailId', component: CocktailDetailsComponent},
      {path: 'spirit/:spirit', component: CocktailListComponent}
    ]
  }
];
