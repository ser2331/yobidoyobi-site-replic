import React from 'react';
import { ReactSVG } from 'react-svg';
import * as PropTypes from 'prop-types';
import Types from '../../../../classes/types';
import spicyIcon from '../../../../assets/images/ico_spicy.svg';
import newIcon from '../../../../assets/images/ico_new.svg';
import hotIcon from '../../../../assets/images/ico_hot.svg';
import recIcon from '../../../../assets/images/ico_rec.svg';

import './product-indicator.scss';

const { productIndicatorMap } = Types;

const ProductIndicator = ({ type }) => {
    const isHot = type === productIndicatorMap.get('hot').type;
    const isNew = type === productIndicatorMap.get('new').type;
    const isRecommended = type === productIndicatorMap.get('recommended').type;
    const isSpicy = type === productIndicatorMap.get('spicy').type;

    return (
        <div className="ProductIndicator">
            { isHot ? <ReactSVG src={hotIcon} className="ProductIndicator__icon icon-fix" /> : ''}
            { isNew ? <ReactSVG src={newIcon} className="ProductIndicator__icon icon-fix" /> : ''}
            { isRecommended ? <ReactSVG src={recIcon} className="ProductIndicator__icon icon-fix" /> : ''}
            { isSpicy ? <ReactSVG src={spicyIcon} className="ProductIndicator__icon icon-fix" /> : ''}
        </div>
    );
};

ProductIndicator.propTypes = {
    type: PropTypes.string.isRequired,
};

export default ProductIndicator;
