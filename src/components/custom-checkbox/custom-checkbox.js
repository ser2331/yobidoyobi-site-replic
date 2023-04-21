import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import './custom-checkbox.scss';

const CustomCheckbox = ({ checked, onChange }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={classNames('CustomCheckbox', { checked })} onClick={onChange} />
);

CustomCheckbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CustomCheckbox;
