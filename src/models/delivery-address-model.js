import BaseModel from './base';

export default class DeliveryAddressModel extends BaseModel {
    constructor(initData) {
        super();
        this.apartment = '';
        this.homeNumber = '';
        this.building = '';
        this.entrance = '';
        this.floor = '';
        this.address = '';
        this.intercom = '';
        this.comment = '';

        this.copyFrom(initData);
    }
}
