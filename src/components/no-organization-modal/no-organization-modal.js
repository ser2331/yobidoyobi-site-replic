import React from 'react';
import { Modal } from 'antd';
import { ReactSVG } from 'react-svg';
import { useDispatch } from 'react-redux';
import { app as appActions } from '../../store/actions';
import closeIcon from '../../assets/images/close.svg';

import './no-organization-modal.scss';

const NoOrganizationModal = () => {
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(appActions.showNoOrganizationModal(false));
        dispatch(appActions.showAddressModal(true));
    };

    return (
        <Modal
            visible
            onCancel={onClose}
            footer={null}
            wrapClassName="AddressModal__wrap"
            closeIcon={
                <ReactSVG src={closeIcon} className="close-icon" />
            }
            centered
        >
            <div className="AddressModal">
                Введёный адрес не поддерживает ни одна наша организация
            </div>

        </Modal>
    );
};

export default NoOrganizationModal;
