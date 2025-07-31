import { Component } from '@angular/core';
import {CocktailViewModel} from '../../types/cocktailViewModel';
import {FlavourEnum} from '../../types/enums/flavour-enum';
import {SpiritNameEnum} from '../../types/enums/spirit-name-enum';
import {CocktailCardComponent} from '../cocktail-card/cocktail-card.component';

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [
    CocktailCardComponent
  ],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.css'
})
export class CocktailListComponent {
  cocktails: CocktailViewModel[] = [
    {
      id: 1,
      name: 'Пина Колада',
      flavour: FlavourEnum.SWEET,
      spirit: SpiritNameEnum.RUM,
      author: 'Author 1',
      pictureUrl: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723493424/rfx5pdjd6cpn3pbbrtcm.jpg',
      percentAlcohol: 13,
      servings: 1
    },
    {
      id: 2,
      name: 'Манхатън',
      flavour: FlavourEnum.BITTER,
      spirit: SpiritNameEnum.WHISKEY,
      author: 'Author 1',
      pictureUrl: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723493424/rfx5pdjd6cpn3pbbrtcm.jpg',
      percentAlcohol: 30,
      servings: 1
    },
    {
      id: 3,
      name: 'Текила сънрайз',
      flavour: FlavourEnum.SWEET,
      spirit: SpiritNameEnum.TEQUILA,
      author: 'Author 1',
      pictureUrl: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723493424/rfx5pdjd6cpn3pbbrtcm.jpg',
      percentAlcohol: 12,
      servings: 1
    },
    {
      id: 4,
      name: 'Мартини',
      flavour: FlavourEnum.SAVORY,
      spirit: SpiritNameEnum.GIN,
      author: 'Author 1',
      pictureUrl: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723378829/mz8brm4guvo2ghme4lcv.png',
      percentAlcohol: 31,
      servings: 1
    },
    {
      id: 5,
      name: 'Блъди Мери',
      flavour: FlavourEnum.SAVORY,
      spirit: SpiritNameEnum.VODKA,
      author: 'Author 1',
      pictureUrl: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723131202/o3vakwrhgrzlgrctp4gs.jpg',
      percentAlcohol: 12,
      servings: 1
    },
    {
      id: 6,
      name: 'Бренди сауър',
      flavour: FlavourEnum.SOUR,
      spirit: SpiritNameEnum.BRANDY,
      author: 'Author 1',
      pictureUrl: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723131202/exkybjsjyonsib8b4lnf.jpg',
      percentAlcohol: 15,
      servings: 1
    },
    {
      id: 7,
      name: 'Безалкохолно мохито',
      flavour: FlavourEnum.SOUR,
      spirit: SpiritNameEnum.NONE,
      author: 'Author 2',
      pictureUrl: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723131202/w4ukqvhml1zkqydqhel1.jpg',
      percentAlcohol: 0,
      servings: 1
    },
    {
      id: 8,
      name: 'Мохито',
      flavour: FlavourEnum.SWEET,
      spirit: SpiritNameEnum.RUM,
      author: 'Author 2',
      pictureUrl: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723377633/duhvmdz81pzmlgdzq7cx.jpg',
      percentAlcohol: 10,
      servings: 2
    },
    {
      id: 9,
      name: 'Уиски Сауър',
      flavour: FlavourEnum.SOUR,
      spirit: SpiritNameEnum.WHISKEY,
      author: 'Author 2',
      pictureUrl: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723546562/ueqtcmj58dkrwndpshiq.jpg',
      percentAlcohol: 14,
      servings: 1
    },
    {
      id: 10,
      name: 'Негрони',
      flavour: FlavourEnum.BITTER,
      spirit: SpiritNameEnum.GIN,
      author: 'Author 2',
      pictureUrl: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723378386/vbhxtfkuxk32x9qxrfno.png',
      percentAlcohol: 24,
      servings: 1
    },
    {
      id: 11,
      name: 'Пъпешов коктейл',
      flavour: FlavourEnum.SWEET,
      spirit: SpiritNameEnum.NONE,
      author: 'Author 1',
      pictureUrl: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723380112/Screenshot_2024-08-11_at_15.41.09_laysak.png',
      percentAlcohol: 0,
      servings: 1
    },
    {
      id: 12,
      name: 'Коктейл с диня',
      flavour: FlavourEnum.SWEET,
      spirit: SpiritNameEnum.NONE,
      author: 'Author 2',
      pictureUrl: 'https://res.cloudinary.com/dlknl4mzd/image/upload/v1723380302/smni2t0omh2dtc6cihry.png',
      percentAlcohol: 0,
      servings: 1
    }
  ];

}
