import React from 'react';
import { useSelector } from 'react-redux';
import * as _ from 'lodash';
import Slider from 'react-slick';
import Types from '../../classes/types';
import slideImage from '../../assets/images/slide.png';

import './product-slider.scss';

const { appSizesMap } = Types;

const ProductSlider = () => {
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const sliders = useSelector((state) => _.get(state, 'app.sliders'));

    const getCenterPadding = () => {
        switch (appSize) {
        case appSizesMap.get('mobile').key:
            return '38px';

        case appSizesMap.get('tablet').key:
            return '64px';

        case appSizesMap.get('desktop').key:
            return '228px';

        case appSizesMap.get('large').key:
            return '360px';

        default:
            return '228px';
        }
    };

    const sliderSettings = {
        autoplay: true,
        autoplaySpeed: 10000,
        centerMode: true,
        centerPadding: getCenterPadding(),
        dots: false,
        focusOnSelect: true,
    };

    const renderContent = () => (
        <div className="ProductSlider__content-wrapper container">
            <Slider {...sliderSettings}>
                {sliders.map((slide) => (
                    <div key={slide.id}>
                        <img src={slide.cover.includes('http') ? slide.cover : slideImage} alt={slide.name} />
                    </div>
                ))}
            </Slider>
        </div>
    );

    return (
        <div className="ProductSlider">
            {sliders.length ? renderContent() : ''}
        </div>
    );
};

export default ProductSlider;
