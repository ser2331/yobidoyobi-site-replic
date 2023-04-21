import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { Modal } from 'antd';
import { ReactSVG } from 'react-svg';
import { app as appActions } from '../../store/actions';
import CustomButton from '../custom-button';
import closeIcon from '../../assets/images/close.svg';

import './order-amount-modal.scss';

const OrderAmountModal = () => {
    const sum = useSelector((state) => _.get(state, 'basket.sum'));
    const dispatch = useDispatch();

    const onCloseModal = () => dispatch(appActions.showOrderAmountModal(false));

    return (
        <Modal
            visible
            onCancel={onCloseModal}
            footer={null}
            closeIcon={<ReactSVG src={closeIcon} className="close-icon" />}
            wrapClassName="OrderAmountModal__wrap"
            centered
        >
            <div className="OrderAmountModal">
                <div className="OrderAmountModal__title modal-title">
                    Ошибка!
                </div>

                <div className="OrderAmountModal__subtitle modal-subtitle">
                    {/* {`Минимальная сумма заказа до указанного адреса ${minOrderPrice} руб.`} */}
                    <br />
                    {`Сумма вашего заказа составляет: ${sum} руб.`}
                </div>

                <CustomButton
                    isSubmit
                    type="red"
                    onClick={onCloseModal}
                    className="OrderAmountModal__submit"
                >
                    Понятно
                </CustomButton>
            </div>
        </Modal>
    );
};

export default OrderAmountModal;
