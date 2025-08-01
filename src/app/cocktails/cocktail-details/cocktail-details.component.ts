import {Component} from '@angular/core';
import {FlavourEnum} from '../../types/enums/flavour-enum';
import {SpiritNameEnum} from '../../types/enums/spirit-name-enum';
import {CocktailDetailsViewModel} from '../../types/cocktailDetailsViewModel';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {TitleCasePipe} from '@angular/common';
import {SafeUrlPipe} from '../../shared/pipes/safe-url.pipe';
import {MatButtonModule} from '@angular/material/button';
import {CommentsListComponent} from '../../comments/comments-list/comments-list.component';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [
    MatIcon,
    MatFormField,
    MatLabel,
    TitleCasePipe,
    SafeUrlPipe,
    MatButtonModule,
    CommentsListComponent
  ],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.css'
})
export class CocktailDetailsComponent {

  cocktail: CocktailDetailsViewModel = {
    id: 1,
    name: 'Пина Колада',
    ingredients: [
      '30 мл. бял ром',
      '30 мл. кокосова сметана',
      '90 мл. сок от ананас',
      '5 с.л. натрошен лед',
      '1 резенче ананас'
    ],
    author: 'User Userov',
    videoId: 'YaQEaf92z00',
    preparation: 'Белият ром (30 мл.), кокосовата сметана (30 мл.) и сокът от ананас (90 мл.) се смесват с натрошен лед до получаване на еднородна смес.\n\nНалива се в изстудена коктейлна чаша.\n\nКоктейлът Пина Колада се украсява с парченца ананас.\n\nВместо сок от ананас, най-добре е да направите пресен сок от плода като разбиете няколко резенчета в блендер.',
    flavour: FlavourEnum.SWEET,
    spirit: SpiritNameEnum.RUM,
    pictureUrl: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723493424/rfx5pdjd6cpn3pbbrtcm.jpg',
    percentAlcohol: 13,
    servings: 1,
    picture: {
      id: 1,
      url: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723493424/rfx5pdjd6cpn3pbbrtcm.jpg'
    },
    comments: [
      {
        id: 1,
        text: 'Comment by Admin',
        created: '2025-07-31T18:42:02',
        author: 'User Userov',
        canDelete: true
      }
    ],
    canDelete: true,
    favorite: true
  }
}
