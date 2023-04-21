import React from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import BasketOtherItem from '../basket-other-item';
import { getOthersItems } from '../../selectors/selectors';

import './basket-other.scss';

const BasketOther = () => {
    const othersItems = useSelector(getOthersItems);

    return (
        <div className="BasketOther">
            <div className="BasketOther__title basket-container">
                Остальное
            </div>

            <div className="basket-divider basket-container" />

            <Scrollbars
                autoHeight
                autoHeightMin={252}
                autoHeightMax={400}
                autoHide={false}
                renderTrackHorizontal={(props) => <div {...props} className="track-horizontal" />}
                renderThumbHorizontal={(props) => <div {...props} className="thumb-horizontal" />}
                renderTrackVertical={(props) => <div {...props} className="track-vertical" />}
                renderThumbVertical={(props) => <div {...props} className="thumb-vertical" />}
                renderView={(props) => <div {...props} className="view" />}
                className="BasketOther__scrollbar"
            >
                <div className="BasketOther__items">
                    {othersItems.map((item) => (
                        <BasketOtherItem
                            itemData={item}
                            key={item.id}
                        />
                    ))}
                </div>

            </Scrollbars>
        </div>
    );
};

export default BasketOther;
