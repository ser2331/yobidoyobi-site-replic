import React from 'react';
import { Form, Formik } from 'formik';
import { ReactSVG } from 'react-svg';
import * as PropTypes from 'prop-types';
import * as Yup from 'yup';
import { validationSchemaSecondStep } from '../../../../form-validators/auth';
import { pad } from '../../../../utils';
import CustomButton from '../../../custom-button';
import InputMask from '../../../input-mask';
import RowButton from '../../../row-button';
import mailIcon from '../../../../assets/images/mail.svg';
import editIcon from '../../../../assets/images/edit.svg';

import './second-step.scss';

const SecondStep = ({
    onSubmit, onResend, onEditNumber, onClearError, resendTimer, registeredError, error,
}) => (
    <div className="SecondStep">
        <div className="AuthModal__title modal-title">
            Введите код из СМС
        </div>

        <Formik
            initialValues={{ code: '' }}
            validationSchema={Yup.object(validationSchemaSecondStep)}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                onSubmit(+values.code);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                <Form onSubmit={handleSubmit}>
                    <InputMask
                        mask="9999"
                        id="code"
                        name="code"
                        value={values.code}
                        onChange={(e) => { if (error) onClearError(); handleChange(e); }}
                        onBlur={handleBlur}
                        error={!!(errors.code && touched.code) || error}
                        className="AuthModal__code-input"
                        centered
                    />

                    <RowButton
                        onClick={onResend}
                        disabled={!!resendTimer}
                        className="AuthModal__resend"
                    >
                        <ReactSVG src={mailIcon} className="resend-icon icon-fix" />
                        Отправить код еще раз
                        &nbsp;
                        {!!resendTimer && <span className="resend-timer">{`00:${pad(resendTimer, 2)}`}</span>}
                    </RowButton>

                    {registeredError && (
                        <RowButton
                            onClick={onEditNumber}
                            className="AuthModal__edit-number"
                        >
                            <ReactSVG src={editIcon} className="edit-icon icon-fix" />
                            Изменить номер
                        </RowButton>
                    )}

                    <CustomButton
                        isSubmit
                        type="red"
                        disabled={!!(errors.code && touched.code) || error}
                        onSubmit={handleSubmit}
                        onClick={() => {}}
                        className="AuthModal__submit-code"
                    >
                        Подтвердить
                    </CustomButton>
                </Form>
            )}
        </Formik>
    </div>
);

SecondStep.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onResend: PropTypes.func.isRequired,
    onEditNumber: PropTypes.func.isRequired,
    onClearError: PropTypes.func.isRequired,
    resendTimer: PropTypes.number.isRequired,
    registeredError: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
};

export default SecondStep;
