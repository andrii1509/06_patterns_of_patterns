import {ViewDataInterface} from '../model/view-data-interface';

export abstract class View {
  protected abstract renderView(viewData: ViewDataInterface[]): void;
}