import uniqid from 'uniqid';
import BaseModel from './base';

export default class GroupModel extends BaseModel {
    constructor(initData) {
        super(initData);
        this.id = uniqid();
        this.name = 'какая то группа';
        this.isStar = false;
        this.items = [];

        this.copyFrom(initData);
    }
}
