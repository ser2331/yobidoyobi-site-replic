import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as _ from 'lodash';
import { app as appActions, basket as basketActions } from '../../store/actions';
import Types from '../../classes/types';
import RowButton from '../row-button';
import CustomCheckbox from '../custom-checkbox';
import CustomButton from '../custom-button';

import './basket-pickup-form.scss';

const { deliveryTypesMap } = Types;

const BasketPickupForm = () => {
    const organizationsList = useSelector((state) => _.get(state, 'organization.organizationsList', []));
    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));
    const dispatch = useDispatch();

    const { deliveryType, companyId } = currentBasket;
    const isPickup = deliveryType === deliveryTypesMap.get('pickup').value;

    const [pickupId, setPickupId] = useState(isPickup ? currentBasket.companyId : 0);

    const onSubmit = () => {
        dispatch(basketActions.setPickup(pickupId));
        dispatch(appActions.showAddressModal(false));
    };

    return (
        <div className="BasketPickupForm">
            <div className="BasketPickupForm__content modalContent">
                <span>Выберите адрес:</span>

                <div className="BasketPickupForm__group-checkbox">
                    {organizationsList.filter(({ address }) => address).map(({ id, address }) => (
                        <div key={id} className="BasketPickupForm one-checked-item">
                            <CustomCheckbox
                                onChange={() => setPickupId(id)}
                                checked={pickupId === id}
                            />
                            <RowButton onClick={() => setPickupId(id)}>
                                {address}
                            </RowButton>
                        </div>
                    ))}
                </div>

                <CustomButton
                    type="red"
                    disabled={(isPickup && companyId === pickupId) || !pickupId}
                    onClick={onSubmit}
                    className="AuthModal__submit-code add-address-btn"
                >
                    <span>Сохранить</span>
                </CustomButton>
            </div>
        </div>
    );
};

export default BasketPickupForm;
