import uniqid from 'uniqid';
import BaseModel from './base';

export default class ItemModel extends BaseModel {
    constructor(initData) {
        super(initData);
        this.id = uniqid();
        this.name = 'Си сяке';
        this.weight = 0;
        this.oldPrice = 0;
        this.price = 0;
        this.is_recommended = false;

        this.copyFrom(initData);
    }
}
