import React from 'react';
import { useNavigate } from 'react-router-dom';
import { batch, useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { app as appActions, organization as organizationActions } from '../../store/actions';
import CitySelectorModal from '../../components/city-selector/components/city-selector-modal';

import './user-location.scss';

const UserLocation = () => {
    const city = useSelector((state) => _.get(state, 'app.city'));
    const citiesList = useSelector((state) => _.get(state, 'app.citiesList'));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSelect = (selectedCity) => batch(() => {
        dispatch(organizationActions.getOrganizations(selectedCity));
        dispatch(appActions.setAppReady(true));
        document.title = `Ёбидоёби - Доставка суши и роллов в ${selectedCity.name_prepositional}`;
        navigate(selectedCity.slug);
    });

    return (
        <div className="UserLocation">
            <CitySelectorModal
                visible
                citiesList={citiesList}
                selectedCity={city}
                onSelect={onSelect}
            />
        </div>
    );
};

export default UserLocation;
