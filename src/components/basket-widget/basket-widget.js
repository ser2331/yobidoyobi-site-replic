import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { CSSTransition } from 'react-transition-group';
import * as _ from 'lodash';
import Modal from 'antd/es/modal/Modal';
import classNames from 'classnames';
import { basket as basketActions, app as appActions } from '../../store/actions';
import BasketItem from './components/basket-item';
import basketIcon from '../../assets/images/basket.svg';
import basketEmptyIcon from '../../assets/images/basket-empty.svg';
import basketSleepIcon from '../../assets/images/basket-sleep.svg';
import deliveryIcon from '../../assets/images/delivery.svg';
import Types from '../../classes/types';
import closeIcon from '../../assets/images/close.svg';

import './basket-widget.scss';

const { routingMap, deliveryTypesMap } = Types;

const BasketWidget = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showWidget, setShowWidget] = useState(false);
    const [showBasketModal, setShowBasketModal] = useState(false);

    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const city = useSelector((state) => _.get(state, 'app.city'));
    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));
    const sum = useSelector((state) => _.get(state, 'basket.sum'));
    const organizationData = useSelector((state) => _.get(state, 'organization.organizationData'));
    const isStage = useSelector((state) => _.get(state, 'app.isStage', false));

    const { cartProduct, deliveryType, deliveryCost, diffCost, excludeDelivery } = currentBasket;
    const { is_working, id: organizationId } = organizationData;

    const isSleep = organizationId && !is_working && isStage;
    const isDelivery = deliveryType === deliveryTypesMap.get('delivery').value;
    const isMobile = appSize === 'mobile';

    const cartProductCount = cartProduct?.length;

    useEffect(() => {
        if (showBasketModal && !isMobile) setShowBasketModal(false);
    }, [isMobile, showBasketModal, setShowBasketModal]);

    const toggleWidget = () => setShowWidget(!showWidget);

    const onDelete = (id, productId) => dispatch(basketActions.deleteBasketProduct(id, productId));

    const onChangeCount = (id, count) => dispatch(basketActions.editBasketProduct(id, count));

    const toggleBasketModal = () => setShowBasketModal(!showBasketModal);

    const mapLink = (path = routingMap.get('location').path) => {
        const { slug } = city;
        return slug ? `/${slug}${path}` : routingMap.get('location').path;
    };

    const renderEmpty = () => (
        <div className="BasketWidget__empty">
            <ReactSVG src={basketEmptyIcon} className="empty-icon icon-fix" />
            <div className="title">Ой, а тут пусто!</div>
            {false && (
                <div className="description">
                    Мы всегда доставляем бесплатно,
                    <br />
                    но сумма заказа должна быть от 700 ₽
                </div>
            )}
        </div>
    );

    const renderSleep = () => (
        <div className="BasketWidget__sleep">
            <ReactSVG src={basketSleepIcon} className="sleep-icon icon-fix" />
            <div className="title">А мы еще спим!</div>
            <div className="description">
                Вы можете оформить заказ на ближайшее рабочее время и мы обязательно доставим его вам
            </div>
        </div>
    );

    const renderDeliveryOrderControl = () => (
        <div className="minimal">
            {!excludeDelivery ? (
                <div className="minimal__remaining">
                    Для того чтобы доставка стала бесплатной пополните корзину на сумму
                    {` ${diffCost} ₽`}
                </div>
            ) : ''}
        </div>
    );

    const renderContent = () => (
        <div className="BasketWidget__content">
            <div className="product-list">
                {cartProduct.map((item, idx) => (
                    <React.Fragment key={item.id}>
                        <BasketItem
                            item={item}
                            onDelete={onDelete}
                            onChangeCount={(quantity) => onChangeCount(item.id, quantity)}
                            useFor="basket-widget"
                        />
                        {(idx + 1) < cartProduct.length && <div className="divider" /> }
                    </React.Fragment>
                ))}
            </div>

            <div className="control">
                <div className={classNames('delivery', { isDelivery })}>
                    <div className="delivery__left">
                        <ReactSVG src={deliveryIcon} className="delivery-icon icon-fix" />
                        Доставка
                    </div>

                    <div className="delivery__right">
                        {isDelivery ? (
                            <div className="delivery-cost">
                                {deliveryCost ? `${deliveryCost} ₽` : 'Бесплатно'}
                            </div>
                        ) : ''}

                        <div className="verify-address">
                            <button
                                className="address"
                                type="button"
                                onClick={() => dispatch(appActions.showAddressModal(true))}
                            >
                                Уточните свой адрес
                            </button>
                        </div>
                    </div>
                </div>

                <div className="divider" />

                <div className="total">
                    <div className="total__title">Итоговая сумма:</div>
                    <div className="total__value">{`${sum} ₽`}</div>
                </div>

                {isDelivery ? renderDeliveryOrderControl() : ''}

                <button
                    className="BasketWidget__button order-button"
                    disabled={isDelivery ? ((sum - deliveryCost) <= 0) : sum <= 0}
                    type="button"
                    onClick={() => navigate(mapLink(routingMap.get('basket').path))}
                >
                    Оформить заказ
                </button>
            </div>
        </div>
    );

    const renderWidget = () => (
        <CSSTransition
            in={showWidget}
            timeout={300}
            classNames="basket-fade"
            unmountOnExit
        >
            <div className="BasketWidget__widget-wrapper">
                { isSleep ? renderSleep() : '' }
                { !isSleep && cartProductCount ? renderContent() : '' }
                { !isSleep && !cartProductCount ? renderEmpty() : '' }
            </div>
        </CSSTransition>
    );

    const renderMobile = () => (
        <Modal
            visible={showBasketModal}
            onCancel={toggleBasketModal}
            footer={null}
            closeIcon={<ReactSVG src={closeIcon} className="close-icon" />}
            wrapClassName="BasketWidget__wrap"
            centered
        >
            <div className="BasketWidget__widget-wrapper">
                { isSleep ? renderSleep() : '' }
                { !isSleep && cartProductCount ? renderContent() : '' }
                { !isSleep && !cartProductCount ? renderEmpty() : '' }
            </div>
        </Modal>
    );

    return (
        <div className="BasketWidget">
            <button
                className="BasketWidget__button"
                onClick={isMobile ? toggleBasketModal : toggleWidget}
                type="button"
            >
                <ReactSVG src={basketIcon} className="basket-icon" />
                <div className="title">Корзина</div>
                <div className="count">{cartProductCount}</div>
            </button>

            { isMobile && renderMobile()}
            { !isMobile && renderWidget()}

            {/* {showWidget && <div className="BasketWidget__backdrop" onPointerUp={() => setShowWidget(false)} />} */}
        </div>
    );
};

export default BasketWidget;
