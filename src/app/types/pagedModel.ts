import {Page} from './page';

export interface PagedModel<T> {
  content: T[];
  page: Page;
}
