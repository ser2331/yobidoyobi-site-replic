import { batch } from 'react-redux';
import * as _ from 'lodash';
import uniqid from 'uniqid';
import { organization as organizationActions, app as appActions } from '..';
import ItemModel from '../../../models/item-model';
import GroupModel from '../../../models/group-model';

export const GROUPS = 'GROUPS';
export const FILTER_ITEMS = 'FILTER_ITEMS';
export const SELECT = 'SELECT';
export const UNSELECT = 'UNSELECT';

export const groups = (payload) => ({ type: GROUPS, payload });
export const filterItems = (payload) => ({ type: FILTER_ITEMS, payload });
export const select = (payload) => ({ type: SELECT, payload });
export const unselect = (payload) => ({ type: UNSELECT, payload });

export const getFilterItems = (allGroups) => (dispatch) => {
    const compoundsArray = allGroups.reduce((acc, group) => {
        const { items: groupItems } = group;
        const groupCompounds = groupItems.reduce((groupCompound, item) => [...groupCompound, ...item.description.split(',')], []);
        const formatCompounds = groupCompounds.map((compound) => compound.toLowerCase());
        const newFormatCompounds = formatCompounds.filter(Boolean);
        return _.uniq([...acc, ...newFormatCompounds]);
    }, []);
    dispatch(filterItems(compoundsArray));
};

export const getGroupsItems = (groupId, companyId) => (dispatch, getState, createApiService) => {
    const productGroups = _.get(getState(), 'products.groups', {});
    const accessToken = _.get(getState(), 'app.accessToken', '');
    const city = _.get(getState(), 'app.city', {});

    createApiService(getState).getGroupsItems(accessToken, city.id, groupId, companyId)
        .then((res) => {
            const group = productGroups.find((g) => g.id === groupId);
            const filteredGroup = productGroups.filter((g) => g.id !== groupId);
            group.items = res.data.data.map((item) => new ItemModel({ ...item, description: item.description.split(',').join(', ') }));
            const newGroups = [...filteredGroup, group];
            const recommendedItems = newGroups.reduce((acc, i) => {
                const filteredItems = i.items.filter((item) => item.is_recommended);
                return [...acc, ...filteredItems];
            }, []);

            const recommendedObj = {
                id: uniqid(), name: 'Рекомендуем', isStar: true, items: recommendedItems, order: 100,
            };

            const recommendedGroup = new GroupModel(recommendedObj);
            const resultArray = recommendedGroup.items.length ? [recommendedGroup, ...newGroups] : newGroups;
            const sortedResultArray = resultArray.sort((a, b) => (a.order > b.order ? 1 : -1));

            batch(() => {
                dispatch(groups(sortedResultArray));
                dispatch(getFilterItems(newGroups));
            });
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(appActions.setAppError('Не удалось получить продукты. Попробуйте пожалуйста ещё раз'));
        });
};

export const getGroups = () => (dispatch, getState, createApiService) => {
    const accessToken = _.get(getState(), 'app.accessToken', '');
    const city = _.get(getState(), 'app.city', 0);
    const organizationData = _.get(getState(), 'organization.organizationData');
    const { id: companyId } = organizationData;

    createApiService(getState).getGroups(accessToken, city.id)
        .then((res) => {
            const groupsList = res.data.data.map((item, idx) => ({ ...item, order: 101 + idx }));
            batch(() => {
                dispatch(organizationActions.setCurrentOrganizationId(companyId));
                dispatch(groups(groupsList));
                groupsList.forEach((group) => {
                    dispatch(getGroupsItems(group.id, companyId));
                });
            });
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(appActions.setAppError('Не удалось получить список продуктовых групп. Попробуйте пожалуйста ещё раз'));
        });
};
