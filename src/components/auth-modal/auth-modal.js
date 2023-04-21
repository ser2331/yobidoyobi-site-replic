import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { Modal } from 'antd';
import * as _ from 'lodash';
import { app as appActions } from '../../store/actions';
import FirstStep from './components/first-step';
import SecondStep from './components/second-step';
import closeIcon from '../../assets/images/close.svg';

import './auth-modal.scss';

let timer = null;

const AuthModal = () => {
    const [step, setStep] = useState(0);
    const [resendTimer, setResendTimer] = useState(0);
    const [error, setError] = useState(false);
    const [registeredError, setRegisteredError] = useState(false);
    const [captchaToken, setCaptchaToken] = useState('');

    const userData = useSelector((state) => _.get(state, 'app.userData'));
    const isAuth = useSelector((state) => _.get(state, 'app.isAuth'));
    const dispatch = useDispatch();

    useEffect(() => {
        if (resendTimer) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }

        return () => clearTimeout(timer);
    }, [resendTimer]);

    useEffect(() => {
        if (error) setRegisteredError(true);
    }, [error]);

    const onClose = useCallback(() => {
        if (timer) clearTimeout(timer);
        dispatch(appActions.showAuth(false));
    }, [dispatch]);

    const onSendSms = (phoneNumber) => {
        dispatch(appActions.getAuthorizationCode(String(phoneNumber), captchaToken));
        setStep(1);
        setResendTimer(10);
    };

    const onResend = () => {
        const phoneNumber = String(userData.unverifiedPhone);
        dispatch(appActions.getAuthorizationCode(String(phoneNumber), captchaToken));
        if (!resendTimer) setResendTimer(10);
    };

    const onEditNumber = () => {
        setStep(0);
        setResendTimer(0);
        setError(false);
        setRegisteredError(false);
        if (timer) clearTimeout(timer);
    };

    const onSendCode = (code) => {
        const phoneNumber = userData.unverifiedPhone;
        dispatch(appActions.getAuthorizationKeys(String(phoneNumber), String(code)));
    };

    useEffect(() => {
        if (isAuth) onClose();
    }, [isAuth, onClose]);

    const onClearError = () => setError(false);

    return (
        <Modal
            visible
            onCancel={onClose}
            footer={null}
            closeIcon={<ReactSVG src={closeIcon} className="close-icon" />}
            wrapClassName="AuthModal__wrap"
            centered
        >
            <div className="AuthModal">
                {!step
                    ? (
                        <FirstStep
                            onSubmit={onSendSms}
                            setCaptchaToken={setCaptchaToken}
                            captchaToken={captchaToken}
                            error={error}
                        />
                    )
                    : (
                        <SecondStep
                            onSubmit={onSendCode}
                            onResend={onResend}
                            onEditNumber={onEditNumber}
                            onClearError={onClearError}
                            resendTimer={resendTimer}
                            registeredError={registeredError}
                            error={error}
                        />
                    )}
            </div>
        </Modal>
    );
};

export default AuthModal;
