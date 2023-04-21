import { products as productActions } from '../../actions';
import GroupModel from '../../../models/group-model';

const initialState = {
    groups: [],
    filterItems: [],
    selectedList: [],
    unselectedList: [],
};

const products = (state = initialState, action) => {
    switch (action.type) {
    case productActions.GROUPS:
        const groupProducts = action.payload.map((group) => new GroupModel(group));
        return {
            ...state,
            groups: groupProducts,
        };

    case productActions.FILTER_ITEMS:
        return {
            ...state,
            filterItems: action.payload,
        };

    case productActions.SELECT:
        return {
            ...state,
            selectedList: action.payload,
        };

    case productActions.UNSELECT:
        return {
            ...state,
            unselectedList: action.payload,
        };

    default:
        return state;
    }
};

export default products;
