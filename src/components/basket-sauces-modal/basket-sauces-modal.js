import React from 'react';
import { ReactSVG } from 'react-svg';
import { Col, Modal, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { basket as basketActions } from '../../store/actions';
import { getSaucesItems } from '../../selectors/selectors';
import SauceItem from '../sauce-item';
import CustomButton from '../custom-button';
import closeIcon from '../../assets/images/close.svg';

import './basket-sauces-modal.scss';

const BasketSaucesModal = () => {
    const dispatch = useDispatch();
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const saucesItems = useSelector(getSaucesItems);
    const mobile = appSize === 'mobile';

    const onCloseModal = () => dispatch(basketActions.showSaucesModal(false));

    return (
        <Modal
            visible
            onCancel={onCloseModal}
            footer={null}
            closeIcon={<ReactSVG src={closeIcon} className="close-icon" />}
            wrapClassName="BasketSaucesModal__wrap"
            centered
        >
            {saucesItems.length ? (
                <CustomButton className="close-button" type="red" onClick={onCloseModal}>
                    Закрыть
                </CustomButton>
            ) : null}

            <div className="BasketSaucesModal">
                <div className="BasketSaucesModal__title modal-title">
                    Добавить соусы
                </div>

                <Row className="BasketSaucesModal__items">
                    {saucesItems.map((itemData) => (
                        <Col span={mobile ? 12 : 8} key={itemData.id}>
                            <SauceItem itemData={itemData} />
                        </Col>
                    ))}
                </Row>
            </div>
        </Modal>
    );
};

export default BasketSaucesModal;
