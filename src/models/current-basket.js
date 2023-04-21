import BaseModel from './base';

export default class CurrentBasketModel extends BaseModel {
    constructor(initData) {
        super();
        this.addressId = 0;
        this.companyId = 0;
        this.deliveryAddressClassified = null;
        this.deliveryType = 1;
        this.promoCode = null;
        this.userId = null;
        this.cartProduct = [];
        this.cartId = '';
        this.address = '';
        this.apartment = '';
        this.building = '';
        this.comment = '';
        this.entrance = '';
        this.floor = '';
        this.homeNumber = '';
        this.intercom = '';
        this.deliveryCost = 0;
        this.diffCost = 0;
        this.excludeDelivery = true;

        this.copyFrom(initData);
    }
}
