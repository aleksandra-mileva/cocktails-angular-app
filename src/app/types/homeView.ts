export interface HomeView {
  cocktail: CocktailHomePageView;
  message: string;
}

export interface CocktailHomePageView {
  id: number;
  pictureUrl: string;
  authorFullName: string;
}
