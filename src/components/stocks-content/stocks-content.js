import React from 'react';
import { useSelector } from 'react-redux';
import * as _ from 'lodash';
import { Col, Row } from 'antd';
// import CustomButton from '../custom-button';
import PageNavigation from '../page-navigation';
import FakeData from '../../fake-data';

import './stocks-content.scss';

const { stocksData } = FakeData;

const StocksContent = () => {
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));

    const getSpan = () => {
        switch (appSize) {
        case 'mobile':
            return null;

        case 'tablet':
            return 8;

        case 'desktop':
            return 6;

        case 'large':
            return 4;

        default:
            return 6;
        }
    };

    return (
        <div className="StocksContent container">
            <div className="StocksContent__nav">
                <PageNavigation namePage="Акции" />
            </div>
            <div className="StocksContent__name">
                Акции
            </div>

            <Row
                gutter={[12, 12]}
                justify="space-between"
                align="middle"
                className="StocksContent__carts"
            >
                {stocksData.map(({
                    id,
                    title,
                    percent,
                    date,
                    stockImage,
                }) => (
                    <Col
                        span={getSpan()}
                        className="StocksContent__cart-wrapper"
                        key={id}
                    >
                        <div className="StocksContent__cart">
                            <div className="stock-image">
                                <img src={stockImage} alt="stock1" />
                            </div>

                            <div className="stock-title">
                                {title}
                            </div>

                            <div className="stock-percent">
                                {`${percent} %`}
                            </div>

                            <div className="cart-footer">
                                <div className="stock-date">
                                    {date}
                                </div>

                                {/*<CustomButton*/}
                                {/*    type="red-outline"*/}
                                {/*    onClick={() => {}}*/}
                                {/*>*/}
                                {/*    Применить*/}
                                {/*</CustomButton>*/}
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default StocksContent;
