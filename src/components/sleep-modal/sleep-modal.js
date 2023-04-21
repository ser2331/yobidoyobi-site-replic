import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { ReactSVG } from 'react-svg';
import { app as appActions } from '../../store/actions';
import CustomButton from '../custom-button';
import closeIcon from '../../assets/images/close.svg';
import basketSleepIcon from '../../assets/images/basket-sleep.svg';

import './sleep-modal.scss';

const SleepModal = () => {
    const dispatch = useDispatch();

    const onCloseModal = () => dispatch(appActions.showSleepModal(false));

    return (
        <Modal
            visible
            onCancel={onCloseModal}
            footer={null}
            closeIcon={<ReactSVG src={closeIcon} className="close-icon" />}
            wrapClassName="SleepModal__wrap"
            centered
        >
            <div className="SleepModal">
                <ReactSVG src={basketSleepIcon} className="sleep-icon icon-fix" />
                <div className="title">А мы еще спим!</div>
                <div className="description">
                    Вы можете оформить заказ на ближайшее рабочее время и мы обязательно доставим его вам
                </div>

                <CustomButton
                    isSubmit
                    type="red"
                    onClick={onCloseModal}
                    className="SleepModal__submit"
                >
                    Понятно
                </CustomButton>
            </div>
        </Modal>
    );
};

export default SleepModal;
