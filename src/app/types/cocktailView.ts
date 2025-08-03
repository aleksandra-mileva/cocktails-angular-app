import {FlavourEnum} from './enums/flavour-enum';
import {SpiritNameEnum} from './enums/spirit-name-enum';

export interface CocktailView {
  id: number;
  name: string;
  flavour: FlavourEnum;
  spirit: SpiritNameEnum;
  author: string;
  pictureUrl: string;
  percentAlcohol: number;
  servings: number;
}
