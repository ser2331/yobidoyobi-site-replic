import React from 'react';
import * as PropTypes from 'prop-types';
import Types from '../../classes/types';

import './basket-line-indicator.scss';

const { basketStepsSet } = Types;

const BasketLineIndicator = ({ activeStep }) => (
    <div className="BasketLineIndicator">
        <div
            className="BasketLineIndicator__inner"
            style={{ width: `${(100 / basketStepsSet.length) * activeStep}%` }}
        />
    </div>
);

BasketLineIndicator.propTypes = {
    activeStep: PropTypes.number.isRequired,
};

export default BasketLineIndicator;
