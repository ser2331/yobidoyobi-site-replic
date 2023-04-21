import React from 'react';
import { useSelector } from 'react-redux';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import Types from '../../classes/types';
import BasketStepIndicator from '../basket-step-indicator';
import stepsDividerIcon from '../../assets/images/steps-divider.svg';
import stepsDividerIconMini from '../../assets/images/steps-divider-mini.svg';

import './basket-steps-indicator.scss';

const { basketStepsSet } = Types;

const BasketStepsIndicator = ({ activeStep }) => {
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));

    const mobile = appSize === 'mobile';
    return (
        <div className="BasketStepsIndicator">
            {basketStepsSet.map(({ title, step }, index) => (
                <React.Fragment key={step}>
                    <BasketStepIndicator
                        isActive={step === activeStep}
                        title={title}
                        step={step}
                    />
                    {((index + 1) < basketStepsSet.length) && (
                        <ReactSVG
                            src={mobile ? stepsDividerIconMini : stepsDividerIcon}
                            className="BasketStepsIndicator__divider icon-fix"
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

BasketStepsIndicator.propTypes = {
    activeStep: PropTypes.number.isRequired,
};

export default BasketStepsIndicator;
