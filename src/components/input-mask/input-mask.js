import React from 'react';
import { ReactSVG } from 'react-svg';
import MaskComponent from 'react-input-mask';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import errorIcon from '../../assets/images/form-error.svg';

import './input-mask.scss';

const InputMask = ({
    mask, maskChar, value, onChange, className, error, centered, ...props
}) => (
    <div className="InputMask__wrap">
        <MaskComponent
            mask={mask}
            maskChar={maskChar}
            alwaysShowMask
            value={value}
            onChange={onChange}
            className={classNames('InputMask', className, { centered }, { error })}
            {...props}
        />

        { error && <ReactSVG src={errorIcon} className="InputMask__error-icon icon-fix" /> }

    </div>
);

InputMask.defaultProps = {
    maskChar: '_',
    className: '',
    error: false,
    centered: false,
};

InputMask.propTypes = {
    mask: PropTypes.string.isRequired,
    maskChar: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    error: PropTypes.bool,
    centered: PropTypes.bool,
};

export default InputMask;
