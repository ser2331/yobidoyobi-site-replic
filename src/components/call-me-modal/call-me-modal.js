import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { ReactSVG } from 'react-svg';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { validationSchema } from '../../form-validators/call-me';
import { app as appActions } from '../../store/actions';
import CustomButton from '../custom-button';
import InputMask from '../input-mask';
import closeIcon from '../../assets/images/close.svg';

import './call-me.scss';

const CallMeModal = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const onCloseModal = () => dispatch(appActions.showCallMe(false));

    const onSubmit = () => {
        const randomCount = Math.random();

        if (randomCount > 0.5) {
            setSuccess(true);
        } else {
            setError(true);
        }

        setTimeout(() => {
            setSuccess(false);
            setError(false);
        }, 3000);
    };

    return (
        <Modal
            visible
            onCancel={onCloseModal}
            footer={null}
            closeIcon={<ReactSVG src={closeIcon} className="close-icon" />}
            wrapClassName="CallMeModal__wrap"
            centered
        >
            <div className="CallMeModal">
                <div className="CallMeModal__title modal-title">
                    Введите номер
                    <br />
                    и мы Вам перезвоним!
                </div>

                <Formik
                    initialValues={{ phone: '' }}
                    validationSchema={Yup.object(validationSchema)}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                        onSubmit();
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => {
                        const formError = errors.phone && touched.phone && !success && !error;

                        return (
                            <Form onSubmit={handleSubmit}>
                                <InputMask
                                    mask="+7 (999) 999-99-99"
                                    id="phone"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="CallMeModal__phone-input"
                                    error={formError}
                                />

                                <CustomButton
                                    isSubmit
                                    type="red"
                                    disabled={formError}
                                    success={success}
                                    error={error}
                                    onSubmit={handleSubmit}
                                    onClick={() => {}}
                                    className="CallMeModal__submit"
                                >
                                    {!success && !error && 'Оставить заявку'}

                                    {success && 'Отправлено'}

                                    {error && 'Повторите попытку позже'}
                                </CustomButton>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </Modal>
    );
};

export default CallMeModal;
