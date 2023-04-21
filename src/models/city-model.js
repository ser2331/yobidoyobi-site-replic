import BaseModel from './base';

export default class CityModel extends BaseModel {
    constructor(initData) {
        super();
        this.id = 0;
        this.name = '';
        this.name_prepositional = '';
        this.slug = '';
        this.country_id = null;
        this.url_vk = null;
        this.url_tiktok = null;
        this.url_instagram = null;
        this.url_telegram = null;
        this.url_flamp = null;
        this.tag_tiktok = null;
        this.policy = null;
        this.deliveryTime = 20;
        this.rating = '3.6';
        this.is_top = false;

        this.copyFrom(initData);
    }
}
