export interface CocktailFormOptions {
  flavours: CocktailEnumOption[];
  spirits: CocktailEnumOption[];
  types: CocktailEnumOption[];
}

export interface CocktailEnumOption {
  name: string;
  value: string;
}

