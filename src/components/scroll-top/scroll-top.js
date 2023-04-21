import React from 'react';
import { BackTop } from 'antd';
import { ReactSVG } from 'react-svg';
import scrollTopIcon from '../../assets/images/scroll-top.svg';
import './scroll-top.scss';

const ScrollTop = () => (
    <BackTop duration={750}>
        <div className="Scroll-top">
            <div className="Scroll-top__title">
                Наверх
            </div>
            <div className="Scroll-top__button">
                <ReactSVG src={scrollTopIcon} className="icon-fix" />
            </div>
        </div>
    </BackTop>
);

export default ScrollTop;
