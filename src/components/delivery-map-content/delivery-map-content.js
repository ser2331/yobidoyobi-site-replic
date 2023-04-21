import React, { useState, useEffect } from 'react';
import {
    Map, Placemark, Polygon, YMaps,
} from 'react-yandex-maps';
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import uniqid from 'uniqid';
import PageNavigation from '../page-navigation';
import mapIcon from '../../assets/images/pointer-map-dark.svg';
import mapIconRed from '../../assets/images/location-marker.svg';

import './delivery-map-content.scss';

const coordsTypes = {
    latitude: 'lat',
    longitude: 'lng',
};

const DeliveryMapContent = () => {
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const organizationsList = useSelector((state) => _.get(state, 'organization.organizationsList'));

    const [centerLatitude, setLatitude] = useState(0);
    const [centerLongitude, setLongitude] = useState(0);
    const [selected, setSelected] = useState(false);

    const isMobile = appSize === 'mobile';
    const isTablet = appSize === 'tablet';
    const isDesktop = appSize === 'desktop';
    const isLarge = appSize === 'large';

    useEffect(() => {
        const getAverageCoords = (type) => organizationsList.reduce((acc, item) => (acc + +item[type]), 0) / organizationsList.length;

        const initialMapCoords = ({
            [coordsTypes.latitude]: getAverageCoords(coordsTypes.latitude),
            [coordsTypes.longitude]: getAverageCoords(coordsTypes.longitude),
        });

        setLatitude(initialMapCoords[coordsTypes.latitude]);
        setLongitude(initialMapCoords[coordsTypes.longitude]);
    }, [organizationsList]);

    const onClick = (lat, long) => {
        setLatitude(lat);
        setLongitude(long);
        setSelected(true);
    };

    return (
        <div className="DeliveryMapContent container">
            <PageNavigation namePage="Доставка" />
            <div className="DeliveryMapContent__name">Доставка</div>
            <div className="DeliveryMapContent__map-wrapper">
                <div className="our-address-wrapper">
                    <div className="our-address">Мы находимся по адресу:</div>
                    <div className="addresses">
                        {organizationsList.map(({
                            id, address, lat, lng,
                        }) => (
                            <React.Fragment key={id}>
                                {address ? (
                                    <button
                                        className="address"
                                        onClick={() => onClick(lat, lng)}
                                        type="button"
                                    >
                                        <ReactSVG src={mapIcon} />
                                        {address}
                                    </button>
                                ) : null}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="map">
                    <YMaps
                        query={{ apikey: 'e60e2992-cc07-48b6-bd8b-3250162140d0' }}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <Map
                            width="100%"
                            height="520px"
                            state={{
                                center: [centerLatitude, centerLongitude],
                                zoom: selected ? 16 : 10,
                                controls: [],
                            }}
                        >
                            {organizationsList.map(({
                                lat,
                                lng,
                                id,
                                zones,
                            }) => (
                                <React.Fragment key={id}>
                                    <Placemark
                                        options={{
                                            iconLayout: 'default#image',
                                            iconImageHref: mapIconRed,
                                            iconImageSize: [24, 24],
                                            iconImageOffset: [-12, -24],
                                        }}
                                        geometry={{ coordinates: [+lat, +lng] }}
                                    />
                                    {zones.length && zones[0].map(({ coordinates, color, comment }) => (
                                        <Polygon
                                            key={uniqid()}
                                            options={{
                                                fillColor: color,
                                                strokeWidth: 1,
                                                strokeColor: '#000000',
                                                opacity: 0.5,
                                            }}
                                            geometry={{ coordinates: [coordinates] }}
                                            properties={{
                                                hintContent: comment && (isDesktop || isLarge) ? `<pre class="comment-content">${comment}</pre>` : '',
                                                balloonContent: comment && (isMobile || isTablet) ? `<pre class="comment-content">${comment}</pre>` : '',
                                            }}
                                            modules={['geoObject.addon.hint', 'geoObject.addon.balloon']}
                                        />
                                    ))}
                                </React.Fragment>
                            ))}
                        </Map>
                    </YMaps>
                </div>
            </div>
        </div>
    );
};

export default DeliveryMapContent;
