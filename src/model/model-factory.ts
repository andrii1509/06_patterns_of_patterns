import {StaticModel} from './staticModel';
import {IndependenceModel} from './independence-model';

export class ModelFactory {

  getModelInstance(modelType: string) {
    switch (modelType) {
      case 'static' : return new StaticModel();
      case 'independence' : return new IndependenceModel();
    }
  }

}