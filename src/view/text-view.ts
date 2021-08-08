import {View} from './view';
import {ViewDataInterface} from '../model/view-data-interface';

export class TextView extends View {

  viewData: ViewDataInterface[];

  renderView(viewData: ViewDataInterface[]): void {

    this.viewData = viewData;

    const container = document.getElementById('render');
    let innerHtml = '';
    if (viewData.length) {
      viewData.forEach((el, index) => {
        innerHtml += `
        <div class="text-view-item-wrap">
            <div class="text-view-item">
                <label for="inp-eur-${index}">EUR</label>
                <input type="number" name="eur_${index}" id="inp-eur-${index}" value="${el.count}">
            </div>
            <div class="text-view-item">
                <label for="inp-${index}">${el.currency}</label>
                <input type="number" name="${el.currency + '_' + index}" ${el.disable ? 'disabled' : ''} id="inp-${index}" value="${el.count * el.cost}">
            </div>
         </div>
        `;
      });
    }

    container.innerHTML = innerHtml;
  }
}