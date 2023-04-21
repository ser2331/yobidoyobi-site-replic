import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import Types from '../../classes/types';
import RowButton from '../row-button';

const { deliveryTypesMap } = Types;

const DeliveryTypeSelector = ({ type, onChange, hasPickup }) => (
    <div className="AddressModal__header">
        <div className="AddressModal__header__title">
            <span>Уточните ваш адрес</span>
        </div>

        <div className="AddressModal__header__delivery-choice">
            <RowButton
                onClick={() => onChange(deliveryTypesMap.get('delivery').type)}
                className={classNames('AddressModal__header__delivery', { active: type === deliveryTypesMap.get('delivery').type })}
            >
                {deliveryTypesMap.get('delivery').label}
            </RowButton>

            {hasPickup && <span className="AddressModal__header__or">или</span>}

            {hasPickup && (
                <RowButton
                    onClick={() => onChange(deliveryTypesMap.get('pickup').type)}
                    className={classNames('AddressModal__header__delivery', { active: type === deliveryTypesMap.get('pickup').type })}
                >
                    {deliveryTypesMap.get('pickup').label}
                </RowButton>
            )}
        </div>
    </div>
);

DeliveryTypeSelector.propTypes = {
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    hasPickup: PropTypes.bool.isRequired,
};

export default DeliveryTypeSelector;
