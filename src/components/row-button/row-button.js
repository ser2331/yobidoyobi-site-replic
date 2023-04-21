import React from 'react';
import * as PropTypes from 'prop-types';

import './row-button.scss';

const RowButton = ({
    onClick, children, className, disabled, isSubmit,
}) => (
    <button
        type={isSubmit ? 'submit' : 'button'}
        disabled={disabled}
        onClick={onClick}
        className={`RowButton ${className}`}
    >
        {children}
    </button>
);

RowButton.defaultProps = {
    className: '',
    disabled: false,
    isSubmit: false,
};

RowButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.node]).isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    isSubmit: PropTypes.bool,
};

export default RowButton;
