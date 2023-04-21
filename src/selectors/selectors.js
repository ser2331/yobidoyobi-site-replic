import { createSelector } from 'reselect';
import * as _ from 'lodash';

const groups = (state) => state.products.groups;
const selectedList = (state) => state.products.selectedList;
const unselectedList = (state) => state.products.unselectedList;
const organizationsList = (state) => state.organization.organizationsList;
const organizationData = (state) => state.organization.organizationData;

export const getFilteredItems = createSelector(
    [groups, selectedList, unselectedList],
    (groupsArray, selected, unselected) => {
        let result = [...groupsArray];

        if (unselected.length) {
            const filteredByUnselected = result.map((group) => {
                const filteredItems = group.items.filter((item) => {
                    const itemCompounds = item.description.split(',');
                    return !_.intersection(unselected, itemCompounds).length;
                });
                return { ...group, items: filteredItems };
            });

            result = filteredByUnselected.filter((g) => g.items.length);
        }

        if (selected.length) {
            const filteredBySelected = result.map((group) => {
                const filteredItems = group.items.filter((item) => {
                    const itemCompounds = item.description.split(',');
                    return _.intersection(selected, itemCompounds).length;
                });
                return { ...group, items: filteredItems };
            });

            result = filteredBySelected.filter((g) => g.items.length);
        }

        return result;
    },
);

export const getFilteredOrganizationsList = createSelector(
    [organizationsList],
    (list) => list.filter(({ lat, lng, address }) => lat && lng && address) || [],
);

export const getOthersItems = createSelector(
    [groups, organizationData],
    (groupsArray, organization) => {
        const items = [];

        if (organization.drinks_group_ids) {
            groupsArray.forEach((group) => {
                const isOther = organization.drinks_group_ids.includes(group.id);
                if (isOther) {
                    items.push(...group.items);
                }
            });
        }

        return items;
    },
);

export const getSaucesItems = createSelector(
    [groups, organizationData],
    (groupsArray, organization) => {
        const items = [];

        if (organization.specialties_group_ids) {
            groupsArray.forEach((group) => {
                const isOther = organization.specialties_group_ids.includes(group.id);
                if (isOther) {
                    items.push(...group.items);
                }
            });
        }

        return items;
    },
);
