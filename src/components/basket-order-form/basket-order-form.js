import React, { useEffect, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { ReactSVG } from 'react-svg';
import ReCAPTCHA from 'react-google-recaptcha';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { Select } from 'antd';
import { CSSTransition } from 'react-transition-group';
import { app as appActions, basket as basketActions } from '../../store/actions';
import { validationSchema } from '../../form-validators/basket-order-form';
import { pad } from '../../utils';
import Types from '../../classes/types';
import UserDataModel from '../../models/user-data-model';
import BasketCounter from '../basket-widget/components/basket-counter';
import CustomCheckbox from '../custom-checkbox';
import InputMask from '../input-mask';
import RowButton from '../row-button';
import editIcon from '../../assets/images/edit.svg';
import mailIcon from '../../assets/images/mail.svg';
import errorIcon from '../../assets/images/form-error.svg';
import correctlyIcon from '../../assets/images/correctly.svg';

import './basket-order-form.scss';

const {
    deliveryTypesMap, paymentOptions, paymentOptionsMap, birthdayOptionsMap,
} = Types;

const BasketOrderForm = ({
    onChangePayment, payment, resendTimer, onSendSms, onResend, onCheckCode, appSize, deliverySlotsOptions,
}) => {
    const dispatch = useDispatch();

    const personCount = useSelector((state) => _.get(state, 'basket.personCount'));
    const orderData = useSelector((state) => _.get(state, 'basket.orderData'));
    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));
    const isAuth = useSelector((state) => _.get(state, 'app.isAuth'));
    const errorAuthorization = useSelector((state) => _.get(state, 'app.errorAuthorization'));
    const currentUserData = useSelector((state) => _.get(state, 'app.currentUserData'));
    const userData = useSelector((state) => _.get(state, 'app.userData'));
    const organizationData = useSelector((state) => _.get(state, 'organization.organizationData'));

    const [captchaToken, setCaptchaToken] = useState('');

    const { birthday, deliveryTime } = orderData;

    const [isSendCode, setSendCode] = useState(false);

    const isDelivery = currentBasket.deliveryType === deliveryTypesMap.get('delivery').value;
    const pickupAddress = organizationData.address || '';
    const deliveryAddress = `${currentBasket.address}, д. ${currentBasket.homeNumber}` || '';

    useEffect(() => {
        if (!isSendCode && resendTimer) setSendCode(true);
    }, [isSendCode, resendTimer]);

    useEffect(() => {
        if (errorAuthorization) {
            setTimeout(() => dispatch(appActions.errorAuthorizationKeys(null)), 1500);
        }
    }, [errorAuthorization, dispatch]);

    useEffect(() => {
        if (currentUserData?.name) dispatch(basketActions.setOrderName(currentUserData.name));
    }, [currentUserData, dispatch]);

    useEffect(() => {
        const phone = String(userData?.unverifiedPhone);

        if (!!phone && phone.length < 11) {
            dispatch(appActions.setUserData(new UserDataModel()));
        }
    }, [dispatch]);

    const handleChangePhone = (e, setFieldValue) => {
        setFieldValue('phoneNumber', e.target.value);
        const phone = parseInt(e.target.value.replace(/[^\d]/g, ''), 10);
        dispatch(appActions.setUserData(new UserDataModel({ unverifiedPhone: phone })));
        if (String(phone).length === 11) {
            dispatch(appActions.getUserData(phone));
        }
    };

    const handleChangeName = (e, setFieldValue) => {
        const name = e.target.value;
        const nameRegExp = /[a-zA-Zа-яА-Я- ]$/;
        if (nameRegExp.test(name) || !name.length) {
            dispatch(basketActions.setOrderName(name));
            setFieldValue('name', e.target.value);
        }
    };

    const handleChangeChange = (e, setFieldValue) => {
        setFieldValue('change', e.target.value);
        const change = e.target.value;
        dispatch(basketActions.setOrderChange(change));
    };

    const handleChangeComment = (e, setFieldValue) => {
        setFieldValue('comment', e.target.value);
        const comment = e.target.value;
        dispatch(basketActions.setOrderComment(comment));
    };

    const handleChangeDeliveryType = (value = '') => {
        dispatch(basketActions.setDeliveryTime(value));
    };

    const onChangeBirthday = () => {
        if (birthday === birthdayOptionsMap.get('birthday').type) {
            dispatch(basketActions.updateBirthday(birthdayOptionsMap.get('noBirthday').type));
        } else dispatch(basketActions.updateBirthday(birthdayOptionsMap.get('birthday').type));
    };

    const mobile = appSize === 'mobile';

    return (
        <div className="BasketOrderForm basket-container">
            <Formik
                enableReinitialize
                initialValues={{
                    checkbox: [],
                    name: orderData.userName || currentUserData?.name || '',
                    phoneNumber: String(userData?.unverifiedPhone) || String(currentUserData?.phone) || '',
                    code: '',
                    change: '',
                    persons: '',
                    comment: '',
                }}
                validationSchema={validationSchema}
                validateOnMount
                onSubmit={() => {}}
            >
                {({
                    values,
                    handleBlur,
                    errors,
                    setFieldValue,
                }) => (
                    <div>
                        <Form>
                            <div className="BasketOrderForm__field-container">
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="name">Ваше имя:</label>

                                <div className="name-wrapper">
                                    <Field
                                        className={classNames('field', { error: !!errors.name })}
                                        id="name"
                                        name="name"
                                        placeholder="Введите имя"
                                        onChange={(e) => handleChangeName(e, setFieldValue)}
                                    />

                                    <CSSTransition
                                        in={!!errors.name}
                                        timeout={300}
                                        classNames="form-icon-fade"
                                        unmountOnExit
                                    >
                                        <ReactSVG src={errorIcon} className="form-icon icon-fix" />
                                    </CSSTransition>

                                    {errors.name ? <div className="error-name">{errors.name}</div> : ''}
                                </div>
                            </div>

                            { !isAuth ? (
                                <>
                                    <div className="BasketOrderForm__field-container">
                                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                        <label htmlFor="phoneNumber">Номер телефона:</label>
                                        <div>
                                            <div className="group-field">
                                                <div className="left">
                                                    <RowButton
                                                        onClick={() => onSendSms(values.phoneNumber, captchaToken)}
                                                        disabled={!!errors.phoneNumber || isSendCode || !captchaToken}
                                                        className={classNames('confirmation-left', { active: isSendCode })}
                                                    >
                                                        OK
                                                    </RowButton>
                                                    <InputMask
                                                        mask="+99999999999"
                                                        id="phoneNumber"
                                                        name="phoneNumber"
                                                        value={values.phoneNumber}
                                                        onChange={(e) => handleChangePhone(e, setFieldValue)}
                                                        onBlur={handleBlur}
                                                        className="AuthModal__code-input"
                                                        disabled={isSendCode}
                                                    />
                                                </div>
                                                <div className="right">

                                                    {!isAuth && !errorAuthorization ? (
                                                        <RowButton
                                                            onClick={() => onCheckCode(values.code)}
                                                            disabled={!!errors.code || !!errors.phoneNumber}
                                                            className={classNames('confirmation-right', { active: !!errors.code })}
                                                        >
                                                            OK
                                                        </RowButton>
                                                    ) : ''}
                                                    {isAuth && isSendCode && !errorAuthorization
                                                        ? (<ReactSVG src={correctlyIcon} className="confirmation-right" />) : ''}
                                                    {isAuth && isSendCode && errorAuthorization
                                                        ? (<ReactSVG src={errorIcon} className="confirmation-right" />) : ''}

                                                    <Field
                                                        id="code"
                                                        name="code"
                                                        type="number"
                                                        placeholder="Код из СМС"
                                                        className={classNames('field code', { error: isAuth && isSendCode && errorAuthorization,
                                                            disable: isAuth })}
                                                        disabled={errors.phoneNumber || !isSendCode || isAuth}
                                                    />

                                                </div>
                                            </div>

                                            {(!errors.phoneNumber && !isAuth) ? (
                                                <div className="captcha-wrapper">
                                                    <ReCAPTCHA
                                                        sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                                                        onChange={setCaptchaToken}
                                                    />
                                                </div>
                                            ) : ''}
                                        </div>
                                    </div>

                                    <div className="group-button">
                                        <RowButton
                                            onClick={() => {
                                                setSendCode(false);
                                                setCaptchaToken('');
                                            }}
                                            disabled={!isSendCode || (resendTimer > 0) || !!isAuth}
                                            className="btn-change left"
                                        >
                                            <div className="icon">
                                                <ReactSVG src={editIcon} alt="pen" />
                                            </div>
                                            Изменить номер
                                        </RowButton>

                                        <RowButton
                                            onClick={() => {
                                                onResend();
                                                dispatch(appActions.errorAuthorizationKeys(''));
                                            }}
                                            disabled={!isSendCode || !!resendTimer || !!isAuth}
                                            className="btn-change right"
                                        >
                                            <div className="icon">
                                                <ReactSVG src={mailIcon} alt="letter" />
                                            </div>
                                            {mobile ? 'код еще раз' : 'Отправить код еще раз' }
                                            <span className="timer-container">
                                                {!!resendTimer && <span className="timer">{`00:${pad(resendTimer, 2)}`}</span>}
                                            </span>
                                        </RowButton>
                                    </div>
                                </>
                            ) : ''}

                            <div className="BasketOrderForm__field-container">
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="address">
                                    { isDelivery ? 'Адрес доставки:' : 'Адрес самовывоза:'}
                                </label>
                                <div className="add-address-container">
                                    <input
                                        className="field"
                                        value={isDelivery ? deliveryAddress : pickupAddress}
                                        readOnly
                                        placeholder="Адрес не выбран"
                                    />
                                    <RowButton
                                        onClick={() => dispatch(appActions.showAddressModal(true))}
                                        className="add-address"
                                    >
                                        Изменить адрес
                                    </RowButton>
                                </div>
                            </div>

                            <div className="BasketOrderForm__field-container">
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="deliveryTime">Время доставки:</label>
                                <Select
                                    value={deliveryTime}
                                    onChange={handleChangeDeliveryType}
                                    className="field select-time"
                                    bordered={false}
                                >
                                    {deliverySlotsOptions.map(({ key, value }) => (
                                        <Select.Option key={key} value={value}>
                                            {value}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="BasketOrderForm__field-container">
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="persons">Количество персон:</label>
                                <div className="persons-quantity">
                                    <BasketCounter count={personCount} onChange={(count) => dispatch(basketActions.updatePersonCount(count))} />
                                </div>
                            </div>

                            <div className="BasketOrderForm__field-container checkbox">
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label>Метод оплаты:</label>
                                <div className="right-container">
                                    <div className="payment-methods">
                                        {paymentOptions.map(({ type, key, name }) => (
                                            <div key={key} className="group-checkbox">
                                                <CustomCheckbox
                                                    onChange={() => onChangePayment(type)}
                                                    checked={payment === type}
                                                />
                                                <RowButton onClick={() => onChangePayment(type)}>{name}</RowButton>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="change-in">
                                        {payment === paymentOptionsMap.get('cash').type && (
                                            <Field
                                                className="field"
                                                placeholder="Сдача с"
                                                name="change"
                                                id="change"
                                                onChange={(e) => {
                                                    const { value } = e.target;
                                                    if (value) {
                                                        const nextValue = _.parseInt(value);
                                                        if (_.isNaN(nextValue)) return;
                                                        e.target.value = _.parseInt(value);
                                                    }
                                                    handleChangeChange(e, setFieldValue);
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="BasketOrderForm__field-container comment-wrapper">
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="comment">Комментарий:</label>

                                <Field
                                    placeholder="Комментарий"
                                    className="field comment"
                                    name="comment"
                                    id="comment"
                                    as="textarea"
                                    onChange={(e) => handleChangeComment(e, setFieldValue)}
                                />
                            </div>

                            <div className="BasketOrderForm__field-container birthday-wrapper">
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="birthday">У меня день рождения:</label>

                                <div className="group-field">
                                    <CustomCheckbox
                                        onChange={onChangeBirthday}
                                        checked={birthday === birthdayOptionsMap.get('birthday').type}
                                    />
                                </div>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};

BasketOrderForm.defaultProps = {
    appSize: 'tablet',
};

BasketOrderForm.propTypes = {
    onChangePayment: PropTypes.func.isRequired,
    onResend: PropTypes.func.isRequired,
    onSendSms: PropTypes.func.isRequired,
    onCheckCode: PropTypes.func.isRequired,
    payment: PropTypes.number.isRequired,
    appSize: PropTypes.string,
    resendTimer: PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    deliverySlotsOptions: PropTypes.array.isRequired,
};

export default BasketOrderForm;
