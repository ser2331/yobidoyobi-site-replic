import React from 'react';
import * as PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import defaultErrorIcon from '../../assets/images/form-error.svg';
import defaultSuccessIcon from '../../assets/images/success-form.svg';

import './custom-button.scss';

const CustomButton = ({
    type, isSubmit, children, onClick, disabled, className, error, success, errorIcon, successIcon, ...props
}) => (
    <button
        className={classNames('CustomButton', className, type, { error }, { success })}
        onClick={onClick}
        disabled={disabled}
        type={isSubmit ? 'submit' : 'button'}
        {...props}
    >
        {(success && !error) && <ReactSVG src={successIcon} className="CustomButton__success-icon CustomButton__icon icon-fix" />}
        {(error && !success) && <ReactSVG src={errorIcon} className="CustomButton__success-icon CustomButton__icon icon-fix" />}
        {children}
    </button>
);

CustomButton.defaultProps = {
    type: 'default',
    isSubmit: false,
    disabled: false,
    className: '',
    error: false,
    success: false,
    successIcon: defaultSuccessIcon,
    errorIcon: defaultErrorIcon,
};

CustomButton.propTypes = {
    type: PropTypes.oneOf(['default', 'red', 'red-outline', 'green-outline', 'green']),
    isSubmit: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node]).isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.bool,
    success: PropTypes.bool,
    successIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node]),
    errorIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node]),
};

export default CustomButton;
