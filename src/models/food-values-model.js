import BaseModel from './base';

export default class FoodValuesModel extends BaseModel {
    constructor(initData) {
        super(initData);
        this.label = 'Энерг. ценность';
        this.value = '228 калл';

        this.copyFrom(initData);
    }
}
