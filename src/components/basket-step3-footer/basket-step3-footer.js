import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { basket as basketActions } from '../../store/actions';
import CustomButton from '../custom-button';
import Types from '../../classes/types';

import './basket-step3-footer.scss';

const { routingMap } = Types;

const BasketStep3Footer = () => {
    const city = useSelector((state) => _.get(state, 'app.city'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onResetBasketStep = useCallback(() => dispatch(basketActions.setStep(1)), [dispatch]);

    useEffect(() => onResetBasketStep, [onResetBasketStep]);

    const mapLink = (path = routingMap.get('location').path) => {
        const { slug } = city;
        return slug ? `/${slug}${path}` : routingMap.get('location').path;
    };

    const onBack = () => navigate(mapLink(routingMap.get('home').path));

    // const onCheckOrder = () => {};

    return (
        <div className="Basket-step3-footer">
            <div className="Basket-step3-footer__back-button">
                <CustomButton
                    onClick={onBack}
                    className="Basket-step3-footer__button"
                >
                    Вернуться на главную
                </CustomButton>
            </div>

            {/* <div className="Basket-step3-footer__track-button"> */}
            {/*    <CustomButton */}
            {/*        type="red" */}
            {/*        onClick={onCheckOrder} */}
            {/*        className="Basket-step3-footer__button" */}
            {/*    > */}
            {/*        Следить за статусом заказа */}
            {/*    </CustomButton> */}
            {/* </div> */}
        </div>
    );
};

export default BasketStep3Footer;
