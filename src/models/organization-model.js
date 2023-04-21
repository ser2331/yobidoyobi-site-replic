import BaseModel from './base';

export default class OrganizationModel extends BaseModel {
    constructor(initData) {
        super();
        this.id = 0;
        this.name = '';
        this.address = '-';
        this.phone = '-';
        this.average_delivery_time = 0;
        this.average_score = 0;
        this.scores_quantity = 0;
        this.open_time = 0;
        this.close_time = 0;
        this.city_id = 0;
        this.zones = [];
        this.legal_info = { info: '-', name: '-' };
        this.lat = 0;
        this.lng = 0;

        this.copyFrom(initData);
    }
}
