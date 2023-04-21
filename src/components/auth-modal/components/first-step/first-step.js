import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import * as PropTypes from 'prop-types';
import * as Yup from 'yup';
import * as _ from 'lodash';
import { app as appActions } from '../../../../store/actions';
import { validationSchemaFirstStep } from '../../../../form-validators/auth';
import InputMask from '../../../input-mask';
import CustomButton from '../../../custom-button';

import './first-step.scss';

const FirstStep = ({ onSubmit, setCaptchaToken, captchaToken }) => {
    const [isValidPhone, setValidPhone] = useState(false);

    const userData = useSelector((state) => _.get(state, 'app.userData'));
    const dispatch = useDispatch();

    useEffect(() => {
        if (userData) setValidPhone(true);
    }, [userData, setValidPhone]);

    const handleChangePhone = (e, setFieldValue) => {
        setFieldValue('phone', e.target.value);
        const phoneNumber = parseInt(e.target.value.replace(/[^\d]/g, ''), 10);
        if (String(phoneNumber).length === 11) {
            dispatch(appActions.getUserData(phoneNumber));
            return;
        }

        if (isValidPhone) setValidPhone(false);
    };

    return (
        <div className="FirstStep">
            <div className="AuthModal__title modal-title">
                Вход или регистрация
            </div>

            <Formik
                initialValues={{ phone: '_' }}
                validationSchema={Yup.object(validationSchemaFirstStep)}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    const phoneNumber = parseInt(values.phone.replace(/[^\d]/g, ''), 10);
                    onSubmit(phoneNumber);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <InputMask
                            mask="+99999999999"
                            id="phone"
                            name="phone"
                            value={values.phone}
                            onChange={(e) => handleChangePhone(e, setFieldValue)}
                            onBlur={handleBlur}
                            error={!!(errors.phone && touched.phone)}
                            className="AuthModal__phone-input"
                        />

                        <div className="AuthModal__captcha-wrapper">
                            <ReCAPTCHA
                                sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
                                onChange={setCaptchaToken}
                            />
                        </div>

                        <CustomButton
                            isSubmit
                            type="red"
                            disabled={!!(errors.phone && touched.phone) || !isValidPhone || !captchaToken}
                            onSubmit={handleSubmit}
                            onClick={() => {}}
                            className="AuthModal__submit-phone"
                        >
                            Получить код в SMS
                        </CustomButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

FirstStep.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    setCaptchaToken: PropTypes.func.isRequired,
    captchaToken: PropTypes.string.isRequired,
};

export default FirstStep;
