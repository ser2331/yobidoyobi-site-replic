import React from 'react';
import PageNavigation from '../page-navigation';
import CustomButton from '../custom-button';
import FakeData from '../../fake-data';

import './product-card-content.scss';

const { ProductCardData } = FakeData;

const ProductCardContent = () => {
    const {
        name,
        productFakePrice,
        dishComposition,
        nutritionalValue,
    } = ProductCardData;

    const { weight, oldPrice, price } = productFakePrice;

    return (
        <div className="ProductCardContent container">
            <PageNavigation namePage="Название блюда" />
            <div className="ProductCardContent__content">
                <div className="product-image" />

                <div className="Dish">
                    <div className="Dish__name">{name}</div>

                    <div className="Dish__composition">
                        <div className="title">Состав:</div>
                        <div className="composition-wrapper">
                            {dishComposition.map(({ id, title }) => (
                                <div key={id} className="compound">
                                    {title}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="Dish__composition">
                        <div className="title">Пищевая ценность на 100г:</div>
                        <div className="value-content">{nutritionalValue}</div>
                    </div>

                    <div className="Dish__description-row">
                        <div className="weight">{`${weight} гр.`}</div>

                        <div className="old-price">
                            <span className="value">{Math.ceil(oldPrice).toLocaleString()}</span>
                            <span className="unit">&nbsp;₽</span>
                        </div>

                        <CustomButton
                            onClick={() => {}}
                            type="red-outline"
                            className="price"
                        >
                            {`${Math.ceil(price).toLocaleString()} ₽`}
                        </CustomButton>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductCardContent;
