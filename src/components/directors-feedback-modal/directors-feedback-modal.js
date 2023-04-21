import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { Modal } from 'antd';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import * as Yup from 'yup';
import { app as appActions } from '../../store/actions';
import { validationSchema } from '../../form-validators/directors-feedback';
import CustomButton from '../custom-button';
import InputMask from '../input-mask';
import closeIcon from '../../assets/images/close.svg';
import errorIcon from '../../assets/images/form-error.svg';
import photoIcon from '../../assets/images/photo.svg';

import './directors-feedback-modal.scss';

const DirectorsFeedbackModal = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const onSuccess = () => {
        const randomCount = Math.random();

        if (randomCount > 0.5) {
            setSuccess(true);
        } else {
            setError(true);
        }
    };

    const getFieldError = (fieldName, errors, touched) => errors[fieldName] && touched[fieldName] && !success && !error;

    return (
        <Modal
            visible
            onCancel={() => dispatch(appActions.showDirectorsFeedback(false))}
            footer={null}
            closeIcon={<ReactSVG src={closeIcon} className="close-icon" />}
            // bodyStyle={{ padding: '48px' }}
            wrapClassName="DirectorsFeedbackModal__wrap"
            centered
        >
            <div className="DirectorsFeedbackModal">
                <div className="DirectorsFeedbackModal__title modal-title">
                    Здравствуйте!
                </div>

                <div className="DirectorsFeedbackModal__subtitle modal-subtitle">
                    Оставьте Ваш комментарий, имя и телефон
                    <br />
                    и с Вами обязательно свяжутся
                </div>

                <Formik
                    initialValues={{ phone: '', name: '', description: '' }}
                    validationSchema={Yup.object(validationSchema)}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                        onSuccess();
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <Form onSubmit={handleSubmit} className="DirectorsFeedbackModal__form">
                            <InputMask
                                mask="+7 (999) 999-99-99"
                                value={values.phone}
                                id="phone"
                                name="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="DirectorsFeedbackModal__phone-input"
                                error={getFieldError('phone', errors, touched)}
                            />

                            <div className="name-input-wrapper">
                                <Field
                                    id="name"
                                    name="name"
                                    placeholder="Ваше имя"
                                    className={classNames('name-input', { error: getFieldError('name', errors, touched) })}
                                />
                                {getFieldError('name', errors, touched) && <ReactSVG src={errorIcon} className="error-icon" />}
                            </div>

                            <div className="textarea-input-wrapper">
                                <Field
                                    id="description"
                                    name="description"
                                    as="textarea"
                                    placeholder="Что случилось?"
                                    rows={3}
                                    className={classNames('textarea-input', { error: getFieldError('description', errors, touched) })}
                                />
                                {getFieldError('description', errors, touched)
                                && <ReactSVG src={errorIcon} className="error-icon icon-fix" />}
                            </div>

                            <CustomButton
                                onClick={() => {}}
                                type="red-outline"
                                className="DirectorsFeedbackModal__photo"
                            >
                                <ReactSVG src={photoIcon} className="photo-icon icon-fix" />
                                Загрузить фото
                            </CustomButton>

                            <CustomButton
                                isSubmit
                                onSubmit={handleSubmit}
                                onClick={() => {}}
                                disabled={getFieldError('phone', errors, touched)
                                || getFieldError('name', errors, touched)
                                || getFieldError('description', errors, touched)}
                                success={success}
                                error={error}
                                type="red"
                                className="DirectorsFeedbackModal__submit"
                            >
                                {!success && !error && 'Далее'}

                                {success && 'Отправлено'}

                                {error && 'Повторите попытку позже'}
                            </CustomButton>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default DirectorsFeedbackModal;
