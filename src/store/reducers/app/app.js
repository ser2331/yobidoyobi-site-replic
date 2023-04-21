import { app as appActions } from '../../actions';
import Types from '../../../classes/types';
import CityModel from '../../../models/city-model';
import StorageService from '../../../classes/storage-service';
import UserDataModel from '../../../models/user-data-model';

const { appSizesMap, localStorage, minimalUpdateTokenTime } = Types;

const token = StorageService.get(localStorage.accessToken);
const tokenRefresh = StorageService.get(localStorage.refreshToken);
const accessTokenExpiresIn = StorageService.get(localStorage.accessTokenExpiresIn);
const refreshTokenExpiresIn = StorageService.get(localStorage.refreshTokenExpiresIn);
const refreshTokenExpiresDateStamp = StorageService.get(localStorage.refreshTokenExpiresDateStamp);
const accessTokenExpiresDateStamp = StorageService.get(localStorage.accessTokenExpiresDateStamp);
const userData = StorageService.get(localStorage.userData);
const city = StorageService.get(localStorage.city);

const getIsAuth = () => {
    if (token && accessTokenExpiresDateStamp) {
        return (accessTokenExpiresDateStamp - +new Date()) > minimalUpdateTokenTime;
    }
    return false;
};

const initialState = {
    appSize: appSizesMap.get('desktop').key,
    showAuth: false,
    showCallMe: false,
    showDirectorsFeedback: false,
    showGadgetMenu: false,
    showCityModal: false,
    showAddressModal: false,
    showNoOrganizationModal: false,
    showGiftModal: false,
    showOrderAmountModal: false,
    showSleepModal: false,
    isAuth: getIsAuth(),
    accessToken: token || '',
    refreshToken: tokenRefresh || '',
    accessTokenExpiresIn: accessTokenExpiresIn || 0,
    refreshTokenExpiresIn: refreshTokenExpiresIn || 0,
    refreshTokenExpiresDateStamp: refreshTokenExpiresDateStamp || 0,
    accessTokenExpiresDateStamp: accessTokenExpiresDateStamp || 0,
    city: city || new CityModel(),
    citiesList: [],
    appReady: false,
    userData: userData || new UserDataModel(),
    currentUserData: null,
    sliders: [],
    errorAuthorization: null,
    appError: '',
    // isStage: process.env.REACT_APP_ENV === 'stage',
    isStage: false,
};

const app = (state = initialState, action) => {
    switch (action.type) {
    case appActions.APP_SET_SIZE:
        return {
            ...state,
            appSize: action.payload,
        };

    case appActions.APP_SHOW_AUTH:
        return {
            ...state,
            showAuth: action.payload,
        };

    case appActions.APP_SET_TOKEN:
        StorageService.set(localStorage.accessToken, action.payload.accessToken);
        StorageService.set(localStorage.refreshToken, action.payload.refreshToken);
        StorageService.set(localStorage.accessTokenExpiresIn, action.payload.accessTokenExpiresIn);
        StorageService.set(localStorage.refreshTokenExpiresIn, action.payload.refreshTokenExpiresIn);
        StorageService.set(localStorage.accessTokenExpiresDateStamp, +new Date() + (action.payload.accessTokenExpiresIn * 60 * 1000));
        StorageService.set(localStorage.refreshTokenExpiresDateStamp, +new Date() + (action.payload.refreshTokenExpiresIn * 60 * 1000));

        return {
            ...state,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            accessTokenExpiresIn: action.payload.accessTokenExpiresIn,
            refreshTokenExpiresIn: action.payload.refreshTokenExpiresIn,
            accessTokenExpiresDateStamp: +new Date() + (action.payload.accessTokenExpiresIn * 60 * 1000),
            refreshTokenExpiresDateStamp: +new Date() + (action.payload.refreshTokenExpiresIn * 60 * 1000),
            isAuth: true,
        };

    case appActions.APP_LOG_OUT:
        StorageService.remove(localStorage.accessToken);
        StorageService.remove(localStorage.refreshToken);
        StorageService.remove(localStorage.accessTokenExpiresIn);
        StorageService.remove(localStorage.refreshTokenExpiresIn);
        StorageService.remove(localStorage.accessTokenExpiresDateStamp);
        StorageService.remove(localStorage.refreshTokenExpiresDateStamp);
        StorageService.remove(localStorage.userData);

        return {
            ...state,
            accessToken: '',
            refreshToken: 0,
            accessTokenExpiresIn: '',
            refreshTokenExpiresIn: 0,
            accessTokenExpiresDateStamp: 0,
            refreshTokenExpiresDateStamp: 0,
            isAuth: false,
        };

    case appActions.APP_SHOW_NO_ORGANIZATION_MODAL:
        return {
            ...state,
            showNoOrganizationModal: action.payload,
        };

    case appActions.APP_SHOW_CALL_ME:
        return {
            ...state,
            showCallMe: action.payload,
        };

    case appActions.APP_SHOW_DIRECTORS_FEEDBACK:
        return {
            ...state,
            showDirectorsFeedback: action.payload,
        };
    case appActions.APP_SHOW_TABLET_MENU:
        return {
            ...state,
            showGadgetMenu: action.payload,
        };

    case appActions.APP_SHOW_CITY_MODAL:
        return {
            ...state,
            showCityModal: action.payload,
        };

    case appActions.APP_SHOW_ADDRESS_MODAL:
        return {
            ...state,
            showAddressModal: action.payload,
        };

    case appActions.APP_SET_CITY:
        StorageService.set(localStorage.city, action.payload);

        return {
            ...state,
            city: action.payload,
        };

    case appActions.APP_SET_CITIES_LIST:
        return {
            ...state,
            citiesList: action.payload,
        };

    case appActions.APP_READY:
        return {
            ...state,
            appReady: action.payload,
        };

    case appActions.APP_SET_USER_DATA:
        StorageService.set(localStorage.userData, action.payload);

        return {
            ...state,
            userData: action.payload,
        };

    case appActions.APP_SET_CURRENT_USER_DATA:
        return {
            ...state,
            currentUserData: action.payload,
        };

    case appActions.APP_SET_SLIDERS:
        return {
            ...state,
            sliders: action.payload,
        };

    case appActions.APP_SHOW_GIFT_MODAL:
        return {
            ...state,
            showGiftModal: action.payload,
        };

    case appActions.APP_SHOW_ORDER_AMOUNT_MODAL:
        return {
            ...state,
            showOrderAmountModal: action.payload,
        };

    case appActions.APP_SHOW_SLEEP_MODAL:
        return {
            ...state,
            showSleepModal: action.payload,
        };

    case appActions.APP_ERROR:
        return {
            ...state,
            appError: action.payload,
        };

    default:
        return state;
    }
};

export default app;
