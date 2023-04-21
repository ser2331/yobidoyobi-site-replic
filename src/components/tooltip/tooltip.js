import React from 'react';
import * as PropTypes from 'prop-types';
import { Popover } from 'antd';
import { ReactSVG } from 'react-svg';
import tooltipIcon from '../../assets/images/tooltip.svg';
import './tooltip.scss';

const Tooltip = ({ children, ...props }) => (
    <Popover content={children} {...props}>
        <ReactSVG src={tooltipIcon} className="tooltip-icon icon-fix" />
    </Popover>
);

Tooltip.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
};

export default Tooltip;
