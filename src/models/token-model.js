import BaseModel from './base';

export default class TokenModel extends BaseModel {
    constructor(initData) {
        super();
        this.accessToken = '';
        this.accessTokenExpiresIn = 0;
        this.refreshToken = '';
        this.refreshTokenExpiresIn = 0;

        this.copyFrom(initData);
    }
}
