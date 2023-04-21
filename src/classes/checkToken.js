import { app as appActions } from '../store/actions';
import Types from './types';
import store from '../store/index';

const { minimalUpdateTokenTime } = Types;

export default class CheckToken {
    _updateInterval = null;

    _isTokenActual = false;

    _timeLeft = 0;

    // eslint-disable-next-line no-underscore-dangle
    _checkActualToken() {
        const { accessTokenExpiresDateStamp } = store.getState().app;
        // eslint-disable-next-line no-underscore-dangle
        this._isTokenActual = accessTokenExpiresDateStamp > +new Date();
        // eslint-disable-next-line no-underscore-dangle
        this._timeLeft = accessTokenExpiresDateStamp - +new Date();
    }

    init() {
        // eslint-disable-next-line no-underscore-dangle
        if (this._updateInterval !== null) clearInterval(this._updateInterval);

        // eslint-disable-next-line no-underscore-dangle
        this._checkActualToken();

        // eslint-disable-next-line no-underscore-dangle
        if (this._isTokenActual) {
            // eslint-disable-next-line no-underscore-dangle
            this._updateInterval = setInterval(() => {
                store.dispatch(appActions.getNewToken());
                // eslint-disable-next-line no-underscore-dangle
            }, this._timeLeft <= minimalUpdateTokenTime ? 1000 : this._timeLeft - minimalUpdateTokenTime);
        }
    }

    stop() {
        // eslint-disable-next-line no-underscore-dangle
        if (this._updateInterval !== null) clearInterval(this._updateInterval);
    }
}
