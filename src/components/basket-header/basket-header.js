import React from 'react';
import { useSelector } from 'react-redux';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import Logo from '../logo';
import BasketStepsIndicator from '../basket-steps-indicator';

import './basket-header.scss';

const BasketHeader = ({ activeStep }) => {
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));

    const mobile = appSize === 'mobile';
    return (
        <div className="BasketHeader container">
            <div className="BasketHeader__row">
                { !mobile && (<Logo />) }
                <BasketStepsIndicator activeStep={activeStep} />
            </div>
        </div>
    );
};

BasketHeader.propTypes = {
    activeStep: PropTypes.number.isRequired,
};

export default BasketHeader;
