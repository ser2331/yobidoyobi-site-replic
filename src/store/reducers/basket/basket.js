import { basket as basketActions } from '../../actions';
import Types from '../../../classes/types';
import CurrentBasketModel from '../../../models/current-basket';
import StorageService from '../../../classes/storage-service';

const { paymentOptionsMap, birthdayOptionsMap, localStorage } = Types;

const currentBasket = StorageService.get(localStorage.currentBasket);

const initialState = {
    currentBasket: currentBasket || new CurrentBasketModel(),
    sum: 0,
    gifts: [],
    giftId: null,
    step: 1,
    addressHint: {
        value: '',
        data: {},
    },
    personCount: 1,
    payment: paymentOptionsMap.get('cash').type,
    orderData: {
        change: '',
        comment: '',
        userName: '',
        birthday: birthdayOptionsMap.get('noBirthday').type,
        deliveryTime: '',
    },
    zoneId: '',
    userAddresses: [],
    showSaucesModal: false,
    showBirthdayModal: false,
    userOrders: [],
};

const basket = (state = initialState, action) => {
    switch (action.type) {
    case basketActions.BASKET_SET_CURRENT_BASKET:
        StorageService.set(localStorage.currentBasket, action.payload);

        return {
            ...state,
            currentBasket: action.payload,
        };

    case basketActions.BASKET_STEP:
        return {
            ...state,
            step: action.payload,
        };

    case basketActions.BASKET_SET_ADDRESS_HINT:
        return {
            ...state,
            addressHint: action.payload,
        };

    case basketActions.BASKET_SET_PERSON_COUNT:
        return {
            ...state,
            personCount: action.payload,
        };

    case basketActions.BASKET_SET_GIFTS:
        return {
            ...state,
            gifts: action.payload,
        };

    case basketActions.BASKET_SET_GIFT_ID:
        return {
            ...state,
            giftId: action.payload,
        };

    case basketActions.BASKET_SET_PAYMENT:
        return {
            ...state,
            payment: action.payload,
        };

    case basketActions.BASKET_SET_ORDER_NAME:
        return {
            ...state,
            orderData: {
                ...state.orderData,
                userName: action.payload,
            },
        };

    case basketActions.BASKET_SET_ORDER_CHANGE:
        return {
            ...state,
            orderData: {
                ...state.orderData,
                change: action.payload,
            },
        };

    case basketActions.BASKET_SET_BIRTHDAY:
        return {
            ...state,
            orderData: {
                ...state.orderData,
                birthday: action.payload,
            },
        };

    case basketActions.BASKET_SET_ORDER_COMMENT:
        return {
            ...state,
            orderData: {
                ...state.orderData,
                comment: action.payload,
            },
        };

    case basketActions.BASKET_SET_DELIVERY_TIME:
        return {
            ...state,
            orderData: {
                ...state.orderData,
                deliveryTime: action.payload,
            },
        };

    case basketActions.BASKET_SET_TOTAL_SUM:
        return {
            ...state,
            sum: action.payload,
        };

    case basketActions.BASKET_SET_USER_ADDRESSES:
        return {
            ...state,
            userAddresses: action.payload,
        };

    case basketActions.BASKET_SHOW_SAUCES_MODAL:
        return {
            ...state,
            showSaucesModal: action.payload,
        };

    case basketActions.BASKET_SET_USER_ORDERS:
        return {
            ...state,
            userOrders: action.payload,
        };

    case basketActions.BASKET_SHOW_BIRTHDAY_MODAL:
        return {
            ...state,
            showBirthdayModal: action.payload,
        };

    default:
        return state;
    }
};

export default basket;
