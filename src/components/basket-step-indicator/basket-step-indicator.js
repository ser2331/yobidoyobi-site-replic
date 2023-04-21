import React from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';

import './basket-step-indicator.scss';

const BasketStepIndicator = ({ step, title, isActive }) => (
    <div className={classNames('BasketStepIndicator', { active: isActive }, { finishStep: (isActive && step === 3) })}>
        <div className="BasketStepIndicator__circle">{ step }</div>
        <div className="BasketStepIndicator__title">{ title }</div>
    </div>
);

BasketStepIndicator.propTypes = {
    step: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
};

export default BasketStepIndicator;
