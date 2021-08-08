import {SliderView} from './slider-view';
import {TextView} from './text-view';

export class ViewFactory {

  getViewInstance(viewType: string) {
    switch (viewType) {
      case 'text' : return new TextView();
      case 'slider' : return new SliderView();
    }
  }

}