import {Component, Input} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardImage} from '@angular/material/card';
import {CocktailViewModel} from '../../types/cocktailViewModel';
import {MatDivider} from '@angular/material/divider';
import {TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatAnchor} from '@angular/material/button';

@Component({
  selector: 'app-cocktail-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatDivider,
    TitleCasePipe,
    RouterLink,
    MatCardImage,
    MatAnchor
  ],
  templateUrl: './cocktail-card.component.html',
  styleUrl: './cocktail-card.component.css'
})
export class CocktailCardComponent {

  @Input() cocktail!: CocktailViewModel;

}
