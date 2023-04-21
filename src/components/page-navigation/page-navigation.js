import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import Types from '../../classes/types';
import RowButton from '../row-button';

import './page-navigation.scss';

const { routingMap } = Types;

const PageNavigation = ({ namePage }) => {
    const city = useSelector((state) => _.get(state, 'app.city'));
    const navigate = useNavigate();

    const mapLink = (path = routingMap.get('location').path) => {
        const { slug } = city;
        return slug ? `/${slug}${path}` : routingMap.get('location').path;
    };

    const redirectToHome = () => navigate(mapLink(routingMap.get('home').path));

    return (
        <div className="PageNavigation">
            <RowButton className="PageNavigation__home-page" onClick={redirectToHome}>
                Главная
            </RowButton>
            /
            <RowButton className="PageNavigation__current-page" onClick={() => {}}>
                {namePage}
            </RowButton>
        </div>
    );
};

PageNavigation.propTypes = {
    namePage: PropTypes.string.isRequired,
};

export default PageNavigation;
