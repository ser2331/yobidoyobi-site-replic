import { organization as organizationActions } from '../../actions';

const initialState = {
    organizationsList: [],
    organizationData: {},
    currentOrganizationId: 0,
};

const organization = (state = initialState, action) => {
    switch (action.type) {
    case organizationActions.SET_ORGANIZATIONS:
        return {
            ...state,
            organizationsList: action.payload,
        };

    case organizationActions.SET_ORGANIZATION_DATA:
        return {
            ...state,
            organizationData: action.payload,
        };

    case organizationActions.SET_CURRENT_ORGANIZATION_ID:
        return {
            ...state,
            currentOrganizationId: action.payload,
        };

    default:
        return state;
    }
};

export default organization;
