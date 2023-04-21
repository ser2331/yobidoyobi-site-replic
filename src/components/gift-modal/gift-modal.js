import React from 'react';
import { Modal } from 'antd';
import { ReactSVG } from 'react-svg';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import classNames from 'classnames';
import { app as appActions } from '../../store/actions';
import CustomButton from '../custom-button';
import closeIcon from '../../assets/images/close.svg';
import defaultProductImg from '../../assets/images/default-product.svg';

import './gift-modal.scss';

const GiftModal = () => {
    const showGiftModal = useSelector((state) => _.get(state, 'app.showGiftModal', false));
    const giftItems = useSelector((state) => _.get(state, 'basket.gifts'));
    const dispatch = useDispatch();

    const onClose = () => dispatch(appActions.showGiftModal(false));

    const renderContent = (item) => {
        const { price, product, id } = item;
        const { name, images } = product;
        const src = images.length && images[0].original ? images[0].original : defaultProductImg;

        return (
            <div className="GiftModal__content-wrapper__content" key={id}>
                <div className="gift-from">
                    Подарок от
                </div>

                <div className="price">
                    {`${price} ₽`}
                </div>

                <div className="gift-column">
                    <div className="gift-wrapper" key={name}>
                        <div className="img-wrapper">
                            <img src={src} className="img" alt="" />
                        </div>

                        <div className="gift-name">
                            {name}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Modal
            visible={!!showGiftModal}
            onCancel={onClose}
            footer={null}
            closeIcon={<ReactSVG src={closeIcon} className="close-icon" />}
            wrapClassName="GiftModal__wrap"
            centered
        >
            <div className="GiftModal">
                <div className="GiftModal__title-modal">
                    <span>Роллы в подарок</span>
                </div>

                <div className={classNames('GiftModal__content-wrapper', { small: giftItems.length < 3 })}>
                    { giftItems.map((item) => renderContent(item)) }
                </div>

                <CustomButton
                    type="red"
                    onClick={onClose}
                    className="GiftModal__submit"
                >
                    <span>Понятно</span>
                </CustomButton>
            </div>

        </Modal>
    );
};

export default GiftModal;
