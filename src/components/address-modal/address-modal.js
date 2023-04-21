import React, { useCallback, useState } from 'react';
import { Modal, AutoComplete } from 'antd';
import { ReactSVG } from 'react-svg';
import { useDispatch, useSelector, batch } from 'react-redux';
import * as _ from 'lodash';
import { app as appActions, basket as basketActions } from '../../store/actions';
import DeliveryAddressModel from '../../models/delivery-address-model';
import Types from '../../classes/types';
import ApiService from '../../classes/api-service';
import BasketPickupForm from '../basket-pickup-form';
import CustomButton from '../custom-button';
import CustomCheckbox from '../custom-checkbox';
import DeliveryTypeSelector from '../delivery-type-selector';
import RowButton from '../row-button';
import closeIcon from '../../assets/images/close.svg';

import './address-modal.scss';

const { deliveryTypesMap, deliveryTypesMapByValue } = Types;

const formTypes = {
    address: 'ADDRESS',
    homeNumber: 'HOME_NUMBER',
    building: 'BUILDING',
    entrance: 'ENTRANCE',
    intercom: 'INTERCOM',
    floor: 'FLOOR',
    apartment: 'APARTMENT',
    comment: 'COMMENT',
};

const AddressModal = () => {
    const isAuth = useSelector((state) => _.get(state, 'app.isAuth'));
    const city = useSelector((state) => _.get(state, 'app.city'));
    const userAddresses = useSelector((state) => _.get(state, 'basket.userAddresses'));
    const addressHint = useSelector((state) => _.get(state, 'basket.addressHint'));
    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));
    const organizationsList = useSelector((state) => _.get(state, 'organization.organizationsList', []));
    const dispatch = useDispatch();

    const hasPickup = !!organizationsList.length;

    const [deliveryType, setDeliveryType] = useState(hasPickup
        ? deliveryTypesMapByValue.get(currentBasket.deliveryType).type
        : deliveryTypesMap.get('delivery').type);

    const [showAddNewAddress, setShowAddNewAddress] = useState(false);
    const [userAddress, setUserAddress] = useState(userAddresses.find((it) => it.id === currentBasket.addressId) || {});

    const [address, setAddress] = useState(isAuth ? '' : currentBasket.address || '');
    const [homeNumber, setHomeNumber] = useState(isAuth ? '' : currentBasket.homeNumber || '');
    const [building, setBuilding] = useState(isAuth ? '' : currentBasket.building || '');
    const [entrance, setEntrance] = useState(isAuth ? '' : currentBasket.entrance || '');
    const [intercom, setIntercom] = useState(isAuth ? '' : currentBasket.intercom || '');
    const [floor, setFloor] = useState(isAuth ? '' : currentBasket.floor || '');
    const [apartment, setApartment] = useState(isAuth ? '' : currentBasket.apartment || '');
    const [comment, setComment] = useState(isAuth ? '' : currentBasket.comment || '');

    const [hintOptions, setHintOptions] = useState([]);

    const apiService = new ApiService(city.slug || 'krasnoyarsk');

    const onClose = () => dispatch(appActions.showAddressModal(false));

    const addressString = (name, value) => (value ? `${value} ${name}` : '');

    const validateForm = () => {
        const errors = [];

        if (!address || address !== addressHint.value) errors.push(formTypes.address);
        if (!homeNumber) errors.push(formTypes.homeNumber);

        return errors;
    };

    const onSubmit = (selectedAddress) => {
        const deliveryAddressModel = new DeliveryAddressModel({
            apartment, entrance, floor, address, intercom, comment, homeNumber, building,
        });
        batch(() => {
            dispatch(appActions.showAddressModal(false));
            dispatch(basketActions.setDelivery(selectedAddress?.address ? selectedAddress : deliveryAddressModel));
        });
    };

    const getHintOptions = (value) => {
        apiService.getAddressHint(value)
            .then((res) => {
                const options = res.data.map((data) => ({ value: data.value, data: data.data }));
                setHintOptions(options);
            })
            .catch(() => {});
    };

    const getDebouncedHintOptions = useCallback(_.debounce(getHintOptions, 300, { leading: true }), []);

    const handleChangeAddress = (value) => {
        setAddress(value);
        getDebouncedHintOptions(value);
    };

    const blockingSymbol = ($event) => {
        if (['+', '-', 'e', '.'].includes($event.key)) $event.preventDefault();
    };

    const onSelectHint = (value, option) => {
        dispatch(basketActions.setAddressHint(option));
    };

    const renderAddressForm = () => (
        <div className="FormAddAddress-content">
            <AutoComplete
                className="auto-complete-wrapper"
                dropdownClassName="dropdown-auto-complete-wrapper"
                value={address}
                onChange={handleChangeAddress}
                onSelect={(value, option) => onSelectHint(value, option)}
                options={hintOptions}
            >
                <input className="field" placeholder="Адрес" />
            </AutoComplete>

            <div className="home-group">
                <input
                    className="field"
                    placeholder="№ дома"
                    value={homeNumber}
                    onChange={(e) => setHomeNumber(e.target.value)}
                    onKeyDown={blockingSymbol}
                />
                <input
                    className="field"
                    placeholder="Строение"
                    onKeyDown={blockingSymbol}
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                />
            </div>

            <div className="group-field">
                <input
                    className="field"
                    placeholder="Подъезд"
                    type="number"
                    onKeyDown={blockingSymbol}
                    value={entrance}
                    onChange={(e) => setEntrance(e.target.value)}
                />
                <input
                    className="field"
                    placeholder="Домофон"
                    type="number"
                    onKeyDown={blockingSymbol}
                    value={intercom}
                    onChange={(e) => setIntercom(e.target.value)}
                />
                <input
                    className="field"
                    placeholder="Этаж"
                    type="number"
                    onKeyDown={blockingSymbol}
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                />
                <input
                    className="field"
                    placeholder="Квартира"
                    type="number"
                    onKeyDown={blockingSymbol}
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                />
            </div>
            <textarea
                className="comment-address field"
                placeholder="Комментарий к адресу"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
        </div>
    );

    const renderUserAddresses = () => (
        <div className="UserAddresses">
            {
                userAddresses.length ? (
                    <div className="UserAddresses__user-addresses-list">
                        {userAddresses.map((adds) => (
                            <div key={adds.id} className="user-addresses">
                                <div className="address-name-wrapper">
                                    <div className="address-name">
                                        <CustomCheckbox
                                            onChange={() => { setUserAddress(adds); setShowAddNewAddress(false); }}
                                            checked={(adds.id === userAddress.id) && !showAddNewAddress}
                                        />
                                        <RowButton onClick={() => { setUserAddress(adds); setShowAddNewAddress(false); }} className="name-wrapper">
                                            <div className="name">
                                                {`${adds.address}, ${adds.homeNumber}`}
                                            </div>
                                        </RowButton>
                                    </div>

                                    {!(currentBasket.addressId === adds.id) && (
                                        <RowButton onClick={() => dispatch(basketActions.deleteUserAddress(adds.id))} className="delete-address">
                                            Удалить
                                        </RowButton>
                                    )}
                                </div>
                                <div className="address-description">
                                    <span className="description">
                                        {addressString(' кв. ', adds.apartment)}
                                        {addressString(' подъезд ', adds.entrance)}
                                        {addressString(' этаж ', adds.floor)}
                                        {addressString(' д.', adds.homeNumber)}
                                        {addressString(' строение', adds.building)}
                                    </span>
                                </div>

                            </div>
                        ))}

                        <div className="basket-divider" />
                    </div>
                ) : ''
            }

            <div className="UserAddresses__add-new-address">
                <div className="checkbox">
                    <CustomCheckbox
                        onChange={() => setShowAddNewAddress(!showAddNewAddress)}
                        checked={showAddNewAddress}
                    />
                </div>

                <RowButton
                    className="selectedAddress"
                    onClick={() => setShowAddNewAddress(!showAddNewAddress)}
                >
                    Добавить новый адрес
                </RowButton>

            </div>

            { showAddNewAddress ? renderAddressForm() : ''}
        </div>
    );

    const renderSaveButton = () => (
        <CustomButton
            type="red"
            disabled={(Object.keys(userAddress).length === 0) || currentBasket.addressId === userAddress.id}
            onClick={() => onSubmit(userAddress)}
            className="AuthModal__submit-code add-address-btn"
        >
            <span>Сохранить</span>
        </CustomButton>
    );

    const renderSaveButtonNoAuthUser = () => (
        <CustomButton
            type="red"
            disabled={validateForm().length > 0}
            onClick={() => onSubmit()}
            className="AuthModal__submit-code add-address-btn"
        >
            <span>Сохранить</span>
        </CustomButton>
    );

    const renderAddUserAddressButton = () => (
        <CustomButton
            type="red"
            disabled={validateForm().length > 0}
            onClick={() => onSubmit()}
            className="AuthModal__submit-code add-address-btn"
        >
            <span>Добавить новый адрес</span>
        </CustomButton>
    );

    return (
        <Modal
            visible
            onCancel={onClose}
            footer={null}
            closeIcon={<ReactSVG src={closeIcon} className="close-icon" />}
            wrapClassName="AddressModal__wrap"
            centered
        >
            <div className="AddressModal">
                <DeliveryTypeSelector type={deliveryType} onChange={setDeliveryType} hasPickup={hasPickup} />

                { isAuth && deliveryType === deliveryTypesMap.get('delivery').type ? renderUserAddresses() : ''}
                { isAuth && deliveryType === deliveryTypesMap.get('delivery').type && !showAddNewAddress ? renderSaveButton() : ''}
                { isAuth && deliveryType === deliveryTypesMap.get('delivery').type && showAddNewAddress ? renderAddUserAddressButton() : ''}

                { !isAuth && deliveryType === deliveryTypesMap.get('delivery').type ? renderAddressForm() : ''}
                { !isAuth && deliveryType === deliveryTypesMap.get('delivery').type ? renderSaveButtonNoAuthUser() : ''}

                { (deliveryType === deliveryTypesMap.get('pickup').type && hasPickup) ? <BasketPickupForm /> : ''}
            </div>
        </Modal>
    );
};

export default AddressModal;
