import {SliderView} from '../view/slider-view';
import {TextView} from '../view/text-view';
import {StaticModel} from '../model/staticModel';
import {IndependenceModel} from '../model/independence-model';
import {ViewDataInterface} from '../model/view-data-interface';
import {CurrencyInterface} from '../model/currency-interface';
import {parseData} from '../helper/helper';

export class Controller {

  private view: SliderView | TextView;
  private viewData: ViewDataInterface[];
  private model: StaticModel | IndependenceModel;

  constructor(view: SliderView | TextView, model: StaticModel | IndependenceModel) {
    this.view = view;
    this.model = model;
    this.model.gatData().then((data: Array<CurrencyInterface>) => {

      const viewData = parseData(data);
      this.viewData = viewData.map((el) => {
        if (this.model instanceof StaticModel) {
          el.disable = true;
        }
        return el;
      });
      this.view.renderView(this.viewData);
      this.getViewInstance();
    });
  }

  getViewInstance() {
    this.setEventsForView();
  }

  private setEventsForView() {
    this.viewData.forEach((element, index) => {
      if (this.model instanceof StaticModel) {
        this.setTextStaticChangesHandler(index);
      }
      if (this.model instanceof IndependenceModel) {
        this.setDynamicChangesHandler(index);
      }
    });
  }

  private setTextStaticChangesHandler(index: number) {
    const eurHtmlElement = document.getElementById(`inp-eur-${index}`);
    if (eurHtmlElement) {
      eurHtmlElement.addEventListener('change', (event: any) => {
        if (event.target.value <= 1) {
          event.target.value = 1;
        }
        this.viewData.forEach((el) => {
          el.count = +event.target.value;
        });
        this.view.renderView(this.viewData);
        this.setEventsForView();
      });
    }
  }

  private setDynamicChangesHandler(index: number) {
    const eurHtmlElement = document.getElementById(`inp-eur-${index}`);
    const currencyInput = document.getElementById(`inp-${index}`);

    if (eurHtmlElement) {
      eurHtmlElement.addEventListener('change', (event: any) => {
        if (event.target.value <= 1) {
          event.target.value = 1;
        }
        const target: ViewDataInterface = this.viewData[event.target.name.split('_')[1]];
        target.count = +event.target.value;
        this.view.renderView(this.viewData);
        this.setEventsForView();
      });

      if (currencyInput) {
        currencyInput.addEventListener('change', (event: any) => {
          const currency = this.viewData[event.target.name.split('_')[1]];
          currency.count = +event.target.value / currency.baseCost;
          this.view.renderView(this.viewData);
          this.setEventsForView();
        });
      }
    }
  }
}
