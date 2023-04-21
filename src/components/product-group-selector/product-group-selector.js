import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import * as _ from 'lodash';
import { ReactSVG } from 'react-svg';
import Slider from 'react-slick';
import { HashLink } from 'react-router-hash-link';
import Types from '../../classes/types';
import { getFilteredItems } from '../../selectors/selectors';
import { gaDataLayerPush } from '../../utils';
import BasketWidget from '../basket-widget';
import starIcon from '../../assets/images/rating.svg';

import './product-group-selector.scss';

const { routingMap } = Types;

const ProductGroupSelector = () => {
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const city = useSelector((state) => _.get(state, 'app.city'));
    const promoCode = useSelector((state) => _.get(state, 'basket.promoCode'));
    const productGroups = useSelector(getFilteredItems);

    const scrollWithOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -64;
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
    };

    const isMobile = appSize === 'mobile' || appSize === 'tablet';

    const sliderSettings = {
        arrows: false,
        dots: false,
        infinite: false,
        variableWidth: true,
        swipeToSlide: true,
        slidesToScroll: isMobile ? 1 : 8,
    };

    const mapLink = (path = routingMap.get('location').path) => {
        const { slug } = city;
        return slug ? `/${slug}${path}` : routingMap.get('location').path;
    };

    const handleClick = (group) => {
        gaDataLayerPush('view_item_list', {
            items: group.items.map((item) => ({
                id: item.id,
                name: item.name,
                category: group.name,
                price: item.price,
            })),
            coupon: promoCode || '',
        });
    };

    const renderGroups = (group) => {
        const { id, name, isStar } = group;
        return (
            <div className={classNames('ProductGroupSelector__group', { star: isStar })} key={id}>
                <HashLink
                    className="link"
                    to={`${mapLink(routingMap.get('home').path)}#${id}`}
                    scroll={(el) => scrollWithOffset(el)}
                    draggable={false}
                    onClick={() => handleClick(group)}
                >
                    {isStar && <ReactSVG src={starIcon} className="star-icon" />}
                    {name}
                </HashLink>
            </div>
        );
    };

    return (
        <div className="ProductGroupSelector container">
            <div className="ProductGroupSelector__slider-wrapper">
                <Slider {...sliderSettings}>
                    {productGroups.map((group) => (group.items.length ? renderGroups(group) : ''))}
                </Slider>
            </div>

            <BasketWidget />
        </div>
    );
};

export default ProductGroupSelector;
