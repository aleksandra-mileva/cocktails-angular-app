import {FlavourEnum} from './enums/flavour-enum';
import {SpiritNameEnum} from './enums/spirit-name-enum';
import {PictureViewModel} from './pictureViewModel';
import {CommentViewModel} from './commentViewModel';

export interface CocktailDetailsViewModel {
  id: number;
  name: string;
  ingredients: string[];
  author: string;
  videoId: string;
  preparation: string;
  flavour: FlavourEnum;
  spirit: SpiritNameEnum;
  pictureUrl: string;
  percentAlcohol: number;
  servings: number;
  picture: PictureViewModel;
  comments: CommentViewModel[];
  canDelete: boolean;
  favorite:  boolean;
}
