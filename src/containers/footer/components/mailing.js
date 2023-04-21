import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as _ from 'lodash';
import { CSSTransition } from 'react-transition-group';
import { ReactSVG } from 'react-svg';
import * as Yup from 'yup';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { validationSchema } from '../../../form-validators/mailing';
import CustomCheckbox from '../../../components/custom-checkbox';
import errorIcon from '../../../assets/images/form-error.svg';
import successIcon from '../../../assets/images/success-form.svg';

import './mailing.scss';

const Mailing = () => {
    const [subscribe, setSubscribe] = useState(false);
    const [promotionAgree, setPromotionAgree] = useState(false);

    const appSize = useSelector((state) => _.get(state, 'app.appSize'));

    const mobile = appSize === 'mobile';

    useEffect(() => {
        if (subscribe) {
            setTimeout(() => {
                setSubscribe(false);
                setPromotionAgree(false);
            }, 3000);
        }
    }, [subscribe]);

    const onChangePromotions = () => {
        setPromotionAgree(!promotionAgree);
    };

    return (
        <div className="Mailing">
            <div className="Mailing__title">
                Подпишись на рассылку

                {!mobile && <br />}

                и будь в курсе всех акций!
            </div>

            <Formik
                initialValues={{ email: '', checkbox: 'one' }}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    if (!subscribe) setSubscribe(true);
                }}
            >
                {({
                    errors, touched, handleSubmit,
                }) => (
                    <Form onSubmit={handleSubmit} className="Mailing__form">
                        <Field
                            id="email"
                            name="email"
                            className={classNames('Mailing__input', { 'input-error': !!(errors.email && touched.email) })}
                            placeholder="Введи ваш E-mail"
                        />

                        <CSSTransition
                            in={!!(errors.email && touched.email)}
                            timeout={300}
                            classNames="form-icon-fade"
                            unmountOnExit
                        >
                            <ReactSVG src={errorIcon} className="form-icon" />
                        </CSSTransition>

                        <CSSTransition
                            in={subscribe}
                            timeout={300}
                            classNames="form-icon-fade"
                            unmountOnExit
                        >
                            <ReactSVG src={successIcon} className="form-icon" />
                        </CSSTransition>

                        <button
                            disabled={!!(errors.email && touched.email) || !promotionAgree}
                            type="submit"
                            className={classNames('Mailing__button', { subscribed: subscribe })}
                        >
                            {subscribe ? 'Вы подписаны' : 'Подписаться'}
                        </button>
                    </Form>
                )}
            </Formik>

            <div className="Mailing__promotions">
                <CustomCheckbox checked={promotionAgree} onChange={onChangePromotions} />
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div className="description" onClick={onChangePromotions}>
                    Я согласен получать информацию о проводимых акциях и специальных предложениях
                </div>
            </div>
        </div>
    );
};

export default Mailing;
