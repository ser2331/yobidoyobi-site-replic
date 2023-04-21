import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, Rate } from 'antd';
import { ReactSVG } from 'react-svg';
import * as _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { app as appActions, organization as organizationActions } from '../../store/actions';
import CitySelectorModal from './components/city-selector-modal';
import RowButton from '../row-button';
import pointerIcon from '../../assets/images/pointer-map.svg';
import selectorIcon from '../../assets/images/selector.svg';

import './city-selector.scss';

const CitySelector = () => {
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const city = useSelector((state) => _.get(state, 'app.city'));
    const citiesList = useSelector((state) => _.get(state, 'app.citiesList'));
    const organization = useSelector((state) => _.get(state, 'organization.organizationData'));
    const showCityModal = useSelector((state) => _.get(state, 'app.showCityModal', false));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const large = appSize === 'large';
    const desktop = appSize === 'desktop';
    const tablet = appSize === 'tablet';
    const mobile = appSize === 'mobile';

    const toggleModal = (key) => dispatch(appActions.showCityModal(key));

    const onOpen = () => toggleModal(true);

    const onClose = () => toggleModal(false);

    const onSelect = (item) => {
        if (item.id !== city.id) {
            dispatch(organizationActions.getOrganizations(item));
            document.title = `Ёбидоёби - Доставка суши и роллов в ${item.name_prepositional}`;
            navigate(`/${item.slug}`);
        }
    };

    const renderStatsTooltipInner = () => (
        <div className="tooltip-inner">
            <div className="left-zone">
                <div className="title">{`${organization.average_delivery_time || '0'} минут`}</div>
                <div className="subtitle">Среднее время доставки</div>
                <div className="description">Используются данные за посление 7 дней в вашем городе</div>
            </div>
            <div className="right-zone">
                <div className="title">
                    {organization.average_score}
                    <Rate
                        allowHalf
                        disabled
                        value={+organization.average_score}
                        style={{ color: getComputedStyle(document.documentElement).getPropertyValue('--ui-gold'), fontSize: 12 }}
                    />
                </div>
                <div className="subtitle">{`${organization.scores_quantity ? organization.scores_quantity : 0} оценок`}</div>
                <div className="description">Оценить заказ можно в мобильном приложении</div>
            </div>
        </div>
    );

    const renderCity = () => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div className="CitySelector__selected" onClick={onOpen}>
            {city.name}
            <ReactSVG src={selectorIcon} className="selector-icon icon-fix" />
        </div>
    );

    const renderCityGadget = () => (
        <>
            <div className="GadgetMenu__city-sign">
                <div className="pointer-icon">
                    <ReactSVG src={pointerIcon} />
                </div>
                <div className="city">
                    <div>
                        {city.name}
                    </div>
                    <RowButton onClick={onOpen}>
                        Изменить
                    </RowButton>
                </div>
            </div>
            <div className="basket-divider" />
        </>
    );

    const renderPopover = () => (
        <Popover
            placement="bottom"
            arrowPointAtCenter
            overlayClassName="CitySelector__stats-tooltip"
            color={getComputedStyle(document.documentElement).getPropertyValue('--ui-dark')}
            overlayInnerStyle={{ borderRadius: 8 }}
            content={renderStatsTooltipInner}
        >
            <div className="CitySelector__stats">
                <div className="delivery-time">{`${organization.average_delivery_time || '0'} мин`}</div>
                <div className="rating">
                    <div className="rating-numb">
                        {organization.average_score}
                    </div>
                    <Rate
                        allowHalf
                        disabled
                        value={+organization.average_score}
                        style={{ color: getComputedStyle(document.documentElement).getPropertyValue('--ui-gold'), fontSize: 20 }}
                        className="rate-city"
                    />
                </div>
            </div>
            {(mobile || tablet) && <div className="basket-divider" />}
        </Popover>
    );

    const renderModal = () => (
        <CitySelectorModal
            visible={showCityModal}
            onClose={onClose}
            citiesList={citiesList}
            selectedCity={city}
            onSelect={onSelect}
        />
    );

    return (
        <div className="CitySelector">
            {(mobile || tablet) && renderCityGadget()}
            {(desktop || large) && renderCity()}
            {renderPopover()}
            {renderModal()}
        </div>
    );
};

export default CitySelector;
