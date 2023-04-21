import BaseModel from './base';

export default class CompoundModel extends BaseModel {
    constructor(initData) {
        super(initData);
        this.name = 'Лосось';
        this.isHot = false;

        this.copyFrom(initData);
    }
}
