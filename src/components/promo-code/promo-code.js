import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { ReactSVG } from 'react-svg';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import { app as appActions, basket as basketActions } from '../../store/actions';
import Types from '../../classes/types';
import { validationSchema } from '../../form-validators/promo-code';
import CustomButton from '../custom-button';
import RowButton from '../row-button';
import errorIcon from '../../assets/images/form-error.svg';
import promoCodeImg from '../../assets/images/promo-code.svg';
import deleteIcon from '../../assets/images/delete-icon.png';
import DeliveryAddressModel from '../../models/delivery-address-model';

import './promo-code.scss';

const { appSizesMap, deliveryTypesMap } = Types;

const PromoCode = ({ isHeader }) => {
    const dispatch = useDispatch();
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));

    const [showInputPromoCode, setShowInputPromoCode] = useState(false);
    const { deliveryType, cartId, apartment, entrance, floor, address, intercom, comment, homeNumber, building, companyId, promoCode } = currentBasket;

    const desktop = appSize === appSizesMap.get('desktop').key;
    const large = appSize === appSizesMap.get('large').key;
    const tablet = appSize === appSizesMap.get('tablet').key;
    const mobile = appSize === appSizesMap.get('mobile').key;

    const isPickup = deliveryType === deliveryTypesMap.get('pickup').value;

    const isGadget = tablet || mobile;
    const isPc = desktop || large;

    const onSubmit = (code) => {
        const deliveryAddressModel = new DeliveryAddressModel({
            address: address || '',
            homeNumber: homeNumber || '',
            building: building || '',
            apartment: apartment || '',
            entrance: entrance || '',
            floor: floor || '',
            intercom: intercom || '',
            comment: comment || '',
        });

        if (isPickup) {
            dispatch(basketActions.setPickup(companyId, code));
        } else {
            dispatch(basketActions.setDelivery(deliveryAddressModel, code));
        }
    };

    const togglePromoCode = () => {
        if (!cartId) {
            dispatch(appActions.showAddressModal(true));
            return;
        }
        setShowInputPromoCode(!showInputPromoCode);
    };

    const renderHeaderFormPromoCode = () => (
        <Formik
            enableReinitialize
            initialValues={{ code: promoCode || '' }}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                onSubmit(promoCode ? '' : values.code);
            }}
        >
            {({
                errors, touched, handleSubmit,
            }) => (
                <Form onSubmit={handleSubmit} className="PromoCode__form">
                    <Field
                        id="code"
                        name="code"
                        disabled={!!promoCode || !cartId}
                        className={classNames('PromoCode__input', { 'input-error': !!(errors.code && touched.code) })}
                        placeholder={isHeader ? 'Промокод' : 'Введите промокод'}
                    />

                    {((large || desktop) && (errors.code && touched.code)) ? <span className="error-promo-code">{errors.code}</span> : ''}

                    <RowButton
                        isSubmit
                        onClick={handleSubmit}
                        disabled={!!(errors.code && touched.code) || !cartId}
                        className={classNames('header-submit-btn', { active: !!errors.code })}
                    >
                        {promoCode ? (<img alt="delete" src={deleteIcon} />) : 'OK'}
                    </RowButton>

                </Form>
            )}
        </Formik>
    );

    const renderBasketPromoCode = () => (
        <Formik
            enableReinitialize
            initialValues={{ code: promoCode || '' }}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                onSubmit(promoCode ? '' : values.code);
                // if (!status) setStatus(true);
            }}
        >
            {({
                errors, touched, handleSubmit,
            }) => (
                <Form onSubmit={handleSubmit} className="PromoCode__form">
                    <Field
                        id="code"
                        name="code"
                        disabled={!!promoCode || !cartId}
                        className={classNames('PromoCode__input', { 'input-error': !!(errors.code && touched.code) })}
                        placeholder={isHeader ? 'Промокод' : 'Введите промокод'}
                    />
                    <CSSTransition
                        in={!!(errors.code && touched.code)}
                        timeout={300}
                        classNames="form-icon-fade"
                        unmountOnExit
                    >
                        <ReactSVG src={errorIcon} className="form-icon icon-fix" />
                    </CSSTransition>

                    <CustomButton
                        disabled={!!(errors.code && touched.code) || !cartId}
                        type="red"
                        isSubmit
                        className="PromoCode__button"
                        onClick={handleSubmit}
                    >
                        {promoCode ? 'Удалить' : 'Применить'}
                    </CustomButton>
                </Form>
            )}
        </Formik>
    );

    const renderHeaderPromoCode = () => (
        <>
            {(showInputPromoCode && isGadget) || (promoCode && isGadget) ? renderHeaderFormPromoCode() : ''}
            {!promoCode && !showInputPromoCode && isGadget ? (
                <RowButton className="enter-promo-code" onClick={togglePromoCode}>
                    <ReactSVG className="promo-image" src={promoCodeImg} />
                    <span> Ввести промокод </span>
                </RowButton>
            ) : ''}

            { isPc ? (
                <RowButton className="enter-promo-code" onClick={togglePromoCode}>
                    <ReactSVG className="promo-image" src={promoCodeImg} />
                    <span> Ввести промокод </span>
                </RowButton>
            ) : ''}
            {(showInputPromoCode && isPc) || (promoCode && isPc) ? renderHeaderFormPromoCode() : ''}
        </>
    );

    return (
        <div className={classNames('PromoCode', { isHeader })}>
            {isHeader ? renderHeaderPromoCode() : renderBasketPromoCode()}
        </div>
    );
};

PromoCode.propTypes = {
    isHeader: PropTypes.bool,
};

PromoCode.defaultProps = {
    isHeader: false,
};

export default PromoCode;
