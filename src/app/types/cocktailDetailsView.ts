import {FlavourEnum} from './enums/flavour-enum';
import {SpiritNameEnum} from './enums/spirit-name-enum';
import {PictureView} from './pictureView';
import {TypeEnum} from './enums/type-enum';

export interface CocktailDetailsView {
  id: number;
  name: string;
  ingredients: string[];
  author: string;
  videoId: string;
  videoUrl: string;
  preparation: string;
  flavour: FlavourEnum;
  spirit: SpiritNameEnum;
  type: TypeEnum;
  pictureUrl: string;
  percentAlcohol: number;
  servings: number;
  picture: PictureView;
  canDelete: boolean;
  favorite: boolean;
}
