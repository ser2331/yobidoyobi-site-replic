import { combineReducers } from 'redux';
import app from './app';
import basket from './basket';
import products from './products';
import organization from './organization';

export default combineReducers({
    app,
    basket,
    products,
    organization,
});
