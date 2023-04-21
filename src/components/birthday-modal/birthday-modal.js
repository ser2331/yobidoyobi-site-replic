import React from 'react';
import { Modal } from 'antd';
import { ReactSVG } from 'react-svg';
import { useDispatch } from 'react-redux';
import { basket as basketActions } from '../../store/actions';
import closeIcon from '../../assets/images/close.svg';
import Types from '../../classes/types';
import CustomButton from '../custom-button';

import './birthday-modal.scss';

const { birthdayOptionsMap } = Types;

const BirthdayModal = () => {
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(basketActions.showBirthdayModal(false));
    };

    const chooseGift = () => {
        dispatch(basketActions.updateBirthday(birthdayOptionsMap.get('noBirthday').type));
        dispatch(basketActions.createOrder());
        dispatch(basketActions.showBirthdayModal(false));
    };

    const chooseBirthday = () => {
        dispatch(basketActions.updateGiftId(null));
        dispatch(basketActions.createOrder());
        dispatch(basketActions.showBirthdayModal(false));
    };

    return (
        <Modal
            visible
            onCancel={onClose}
            footer={null}
            wrapClassName="BirthdayModal__wrap"
            closeIcon={
                <ReactSVG src={closeIcon} className="close-icon" />
            }
            centered
        >
            <div className="BirthdayModal">
                <div className="Birthday__title modal-title">
                    С днем рождения!
                </div>

                <div className="BirthdayModal__description-wrapper">
                    <p className="description">
                        Сегодня для Вас акция -15% скидка на доставку и -30%
                        на самовывоз, а также 3 дня до и после праздника!
                    </p>
                    <p className="attention">
                        Внимание! Промокоды, подарки и акции не суммируются.
                        Необходимо иметь подтверждающий документ при получении.
                    </p>
                </div>

                <div className="BirthdayModal__buttons">
                    <CustomButton className="gift-button" type="green" onClick={chooseGift}>
                        Оставить подарок
                    </CustomButton>

                    <CustomButton className="discount-button" type="red" onClick={chooseBirthday}>
                        Применить скидку
                    </CustomButton>
                </div>
            </div>
        </Modal>
    );
};

export default BirthdayModal;
