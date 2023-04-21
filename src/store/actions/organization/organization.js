import * as _ from 'lodash';
import { app as appActions, basket as basketActions } from '../index';
import OrganizationModel from '../../../models/organization-model';

export const SET_ORGANIZATIONS = 'SET_ORGANIZATIONS';
export const SET_ORGANIZATION_DATA = 'SET_ORGANIZATION_DATA';
export const SET_CURRENT_ORGANIZATION_ID = 'SET_CURRENT_ORGANIZATION_ID';

export const setOrganizationsList = (payload = []) => ({
    type: SET_ORGANIZATIONS,
    payload,
});

export const setOrganizationData = (payload = new OrganizationModel()) => ({
    type: SET_ORGANIZATION_DATA,
    payload: new OrganizationModel(payload),
});

export const setCurrentOrganizationId = (payload) => ({
    type: SET_CURRENT_ORGANIZATION_ID,
    payload,
});

export const getOrganizations = (selectedCity) => (dispatch, getState, createApiService) => {
    const city = _.get(getState(), 'app.city', '');
    const currentBasket = _.get(getState(), 'basket.currentBasket');
    const { companyId } = currentBasket;

    if (selectedCity.id !== city.id) {
        dispatch(basketActions.resetBasket());
        dispatch(appActions.setCity(selectedCity));
    }

    createApiService(getState).getOrganizations()
        .then((res) => {
            dispatch(setOrganizationsList(res.data.data));
            const firstOrganization = res.data.data.find((org) => org.name.includes('_1'));
            const currentOrganization = res.data.data.find((org) => org.id === companyId);
            if (!currentOrganization) dispatch(basketActions.resetBasket());
            dispatch(setOrganizationData(currentOrganization || firstOrganization || res.data.data[0]));
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(appActions.setAppError('Не удалось получить список организаций в Вашем городе. Попробуйте пожалуйста ещё раз'));
        });
};
