import React from 'react';
import { Modal } from 'antd';
import { ReactSVG } from 'react-svg';
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { app as appActions } from '../../store/actions';
import closeIcon from '../../assets/images/close.svg';
import './error-modal.scss';

const ErrorModal = () => {
    const appError = useSelector((state) => _.get(state, 'app.appError', ''));
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(appActions.setAppError(''));
    };

    return (
        <Modal
            visible={!!appError}
            onCancel={onClose}
            footer={null}
            wrapClassName="ErrorModal__wrap"
            closeIcon={
                <ReactSVG src={closeIcon} className="close-icon" />
            }
            centered
        >
            <div className="ErrorModal">
                {appError}
            </div>
        </Modal>
    );
};

export default ErrorModal;
