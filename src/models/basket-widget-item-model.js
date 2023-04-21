import uniqid from 'uniqid';
import BaseModel from './base';

export default class BasketWidgetItemModel extends BaseModel {
    constructor(initData) {
        super(initData);
        this.id = uniqid();
        this.count = 1;
        this.itemData = {};

        this.copyFrom(initData);
    }
}
