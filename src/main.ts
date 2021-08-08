import {Controller} from './controller/controller';
import {ViewFactory} from './view/view-factory';
import {ModelFactory} from './model/model-factory';

let controller: Controller;
let selectedModelType: string = 'static';
let selectedViewType: string = 'text';

window.onload = () => {
  initializeCurrencyTypeForm();
};

function initializeCurrencyTypeForm() {
  const modelTypeForm = document.getElementById('model-type-form') as HTMLFormElement;
  modelTypeForm.addEventListener('change', (event: any) => {
    selectedModelType = event.target.value;
    initializeView();
  });
  const viewTypeForm = document.getElementById('view-type-form') as HTMLFormElement;
  viewTypeForm.addEventListener('change', (event: any) => {
    selectedViewType = event.target.value;
    initializeView();
  });
  initializeView();
}

function initializeView() {
  const view = new ViewFactory().getViewInstance(selectedViewType);
  const model = new ModelFactory().getModelInstance(selectedModelType);
  controller = new Controller(view, model);
}