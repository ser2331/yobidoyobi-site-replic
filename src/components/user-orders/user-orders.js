import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import moment from 'moment';
import uniqid from 'uniqid';
import { basket as basketActions } from '../../store/actions';
import Types from '../../classes/types';
import CustomButton from '../custom-button';

import './user-orders.scss';

const { ordersStatusMap, ordersStatus } = Types;

const UserOrders = () => {
    const dispatch = useDispatch();
    const userOrders = useSelector((state) => _.get(state, 'basket.userOrders', false));

    useEffect(() => {
        if (userOrders.length) {
            const interval = setInterval(() => dispatch(basketActions.getUserOrders()), 90000);

            return () => clearInterval(interval);
        }
        return () => {};
    }, [dispatch, userOrders]);

    const sliderSettings = {
        arrows: false,
        dots: false,
        infinite: false,
        variableWidth: true,
        swipeToSlide: true,
        slidesToScroll: 1,
    };

    const renderOrders = (order) => {
        const { number, status, expected_delivery_at: expectedDeliveryAt } = order;
        const haveStatus = ordersStatus.find(({ key }) => key === status);
        const dateOrder = expectedDeliveryAt ? moment(expectedDeliveryAt).format('HH:mm') : '';

        return (
            <CustomButton
                key={uniqid()}
                onClick={() => {}}
                type="red"
                className="UserOrders__order-wrapper"
            >
                {number ? (
                    <div className="order-number">
                        {`#${number}`}
                    </div>
                ) : ''}

                {dateOrder ? (
                    <div className="order-date">
                        {`${dateOrder}`}
                    </div>
                ) : ''}

                <div className="condition">
                    {haveStatus ? ordersStatusMap.get(status).label : 'Статус неизвестен'}
                </div>
            </CustomButton>
        );
    };
    return (
        <div className="UserOrders container">
            <div className="UserOrders__title">
                Мои заказы
            </div>
            <div className="UserOrders__content">
                <Slider {...sliderSettings}>
                    {userOrders.length ? userOrders.map((order) => renderOrders(order)) : ''}
                </Slider>
            </div>
        </div>
    );
};

export default UserOrders;
