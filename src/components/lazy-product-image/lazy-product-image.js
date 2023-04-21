import React, { useRef, useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import useOnScreen from '../../hooks/use-on-screen';
import defaultProductImg from '../../assets/images/default-product.svg';

const LazyProductImage = ({ images, name, getImageSize }) => {
    const [isLoaded, setLoaded] = useState(false);
    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const isVisible = useOnScreen(containerRef, '300px');

    const src = images.length ? images[0][getImageSize()] : defaultProductImg;

    useEffect(() => {
        if (!isVisible || isLoaded) return;

        if (imageRef && imageRef.current) {
            imageRef.current.onload = () => setLoaded(true);
        }
    }, [isVisible, isLoaded]);

    return (
        <div className="LazyProductImage" ref={containerRef}>
            {(isVisible || isLoaded) ? (
                <img
                    ref={imageRef}
                    src={src}
                    alt={name}
                />
            ) : (
                <img
                    src={defaultProductImg}
                    alt="product_img"
                />
            )}
        </div>
    );
};

LazyProductImage.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    images: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    getImageSize: PropTypes.func.isRequired,
};

export default LazyProductImage;
