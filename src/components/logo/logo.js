import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import classNames from 'classnames';
import Types from '../../classes/types';
import logoSVG from '../../assets/images/logo.svg';

import './logo.scss';

const { routingMap, appSizesMap } = Types;

const Logo = ({ colorsInverse, disableRedirect, basketLogo }) => {
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const city = useSelector((state) => _.get(state, 'app.city'));

    const large = appSize === appSizesMap.get('large').key;
    const desktop = appSize === appSizesMap.get('desktop').key;

    const mapLink = (path = routingMap.get('location').path) => {
        const { slug } = city;
        return slug ? `/${slug}${path}` : routingMap.get('location').path;
    };

    const renderLogoSVG = () => {
        if (disableRedirect) return (<ReactSVG src={logoSVG} />);

        return (
            <Link to={mapLink(routingMap.get('home').path)} className="Logo__img">
                <ReactSVG src={logoSVG} />
            </Link>
        );
    };

    return (
        <div className={classNames('Logo', { inverse: colorsInverse })}>
            { renderLogoSVG() }
            { (desktop || large) && !basketLogo ? (
                <div className="Logo__description">
                    <div className="Logo__delivery">
                        Доставка суши и роллов
                    </div>
                    <div className="Logo__city">
                        {`в ${city.name_prepositional}` || ''}
                    </div>
                </div>
            ) : null }
        </div>
    );
};

Logo.defaultProps = {
    colorsInverse: false,
    disableRedirect: false,
    basketLogo: false,
};

Logo.propTypes = {
    colorsInverse: PropTypes.bool,
    disableRedirect: PropTypes.bool,
    basketLogo: PropTypes.bool,
};

export default Logo;
