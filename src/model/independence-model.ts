import {CurrencyInterface} from './currency-interface';

export class IndependenceModel {
  constructor() {}

  public gatData(): Promise<CurrencyInterface[]> {
    return fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
      .then((response) => {
        return response.json();
      });
  }
}