import React, { useEffect } from 'react';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { app as appActions, basket as basketActions } from '../../store/actions';
import giftIcon from '../../assets/images/gift.svg';
import RowButton from '../row-button';

import './progress-bar.scss';

const ProgressBar = () => {
    const dispatch = useDispatch();

    const giftItems = useSelector((state) => _.get(state, 'basket.gifts'));
    const sum = useSelector((state) => _.get(state, 'basket.sum'));
    const organizationData = useSelector((state) => _.get(state, 'organization.organizationData'));

    const pointsMap = giftItems.reduce((acc, gift) => acc.set(+gift.price), new Map());
    const points = Array.from(pointsMap.keys()).filter((it) => it) || [];

    const maxGiftPrice = Math.max.apply(null, points);
    const totalWidth = maxGiftPrice + (maxGiftPrice * 0.15);
    const minBarWidth = 1000;
    const currentWidth = sum;

    useEffect(() => {
        if (organizationData.id) dispatch(basketActions.getGifts());
    }, [dispatch, organizationData]);

    const showModal = () => {
        dispatch(basketActions.getGifts());
        dispatch(appActions.showGiftModal(true));
    };

    const renderContent = () => (
        <div className="ProgressBar">
            <div className="ProgressBar__inner">
                <ReactSVG src={giftIcon} className="gift-icon" />

                <div className="title">
                    Роллы в подарок
                </div>

                <RowButton type="button" className="link" onClick={showModal}>
                    Как это работает?
                </RowButton>
            </div>

            <div
                className="ProgressBar__bar"
                style={{
                    width: `${(currentWidth / totalWidth) * 100}%`,
                    minWidth: `${(minBarWidth / totalWidth) * 100}%`,
                    maxWidth: `${(maxGiftPrice / totalWidth) * 100}%`,
                }}
            />
            <div className="ProgressBar__points">
                {points.map((point) => (
                    <div
                        key={point}
                        className={classNames('ProgressBar__point', { active: currentWidth >= point })}
                        style={{ left: `${(point / totalWidth) * 100}%` }}
                    >
                        <div className="point-title">
                            {`${point.toLocaleString()} ₽`}
                        </div>
                        <div className="point-sign" />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            {giftItems.length ? renderContent() : ''}
        </>
    );
};

export default ProgressBar;
