import {CurrencyInterface} from '../model/currency-interface';
import {ViewDataInterface} from '../model/view-data-interface';

export function parseData(data: CurrencyInterface[]): ViewDataInterface[] {
  const eur = data.filter((el) => el.ccy === 'EUR')[0];
  return data.map((el) => {
    if (el.ccy === 'EUR') {
      return {
        cost: +el.buy,
        currency: 'UAH',
        disable: false,
        count: 1,
        baseCost: +el.buy
      };
    } else {
      return {
        cost: +(eur.buy / el.buy).toFixed(2),
        currency: el.ccy,
        disable: false,
        count: 1,
        baseCost: +(eur.buy / el.buy).toFixed(2)
      };
    }
  }).filter((el) => el.cost > 0 && el.currency !== 'EUR');
}