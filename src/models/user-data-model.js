import BaseModel from './base';

export default class UserDataModel extends BaseModel {
    constructor(initData) {
        super();
        this.unverifiedPhone = null;

        this.copyFrom(initData);
    }
}
