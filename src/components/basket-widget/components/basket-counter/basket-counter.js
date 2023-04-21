import React from 'react';
import * as PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import minusIcon from '../../../../assets/images/minus.svg';
import plusIcon from '../../../../assets/images/plus.svg';

import './basket-counter.scss';

const BasketCounter = ({ count, onChange }) => {
    const onIncrement = () => {
        onChange(count + 1);
    };

    const onDecrement = () => {
        if (count > 1) onChange(count - 1);
    };

    return (
        <div className="BasketCounter">
            <ReactSVG src={minusIcon} className="BasketCounter__minus-icon icon-fix" onClick={onDecrement} />
            <div className="BasketCounter__count">{count}</div>
            <ReactSVG src={plusIcon} className="BasketCounter__plus-icon icon-fix" onClick={onIncrement} />
        </div>
    );
};

BasketCounter.propTypes = {
    count: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default BasketCounter;
