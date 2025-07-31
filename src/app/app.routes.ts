import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CocktailListComponent} from './cocktails/cocktail-list/cocktail-list.component';

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  { path: 'cocktails', component: CocktailListComponent }
];
