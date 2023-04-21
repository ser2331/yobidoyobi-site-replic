import React, { useState } from 'react';
import * as _ from 'lodash';
import { ReactSVG } from 'react-svg';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { useDispatch, useSelector, batch } from 'react-redux';
import { products as actions } from '../../store/actions';
import filterIcon from '../../assets/images/filter.svg';
import likeIcon from '../../assets/images/heart-outline.svg';
import dislikeIcon from '../../assets/images/close.svg';

import './product-filter.scss';

const ProductFilter = () => {
    const dispatch = useDispatch();
    const filterItems = useSelector((state) => _.get(state, 'products.filterItems', []));
    const selectedList = useSelector((state) => _.get(state, 'products.selectedList', []));
    const unselectedList = useSelector((state) => _.get(state, 'products.unselectedList', []));

    const [expand, setExpand] = useState(false);

    const onSelect = (event) => {
        const { key } = event.currentTarget.dataset;
        const isSelect = selectedList.includes(key);

        if (isSelect) {
            dispatch(actions.select(selectedList.filter((i) => i !== key)));
        } else {
            batch(() => {
                dispatch(actions.select([...selectedList, key]));
                dispatch(actions.unselect(unselectedList.filter((i) => i !== key)));
            });
        }
    };

    const onUnselect = (event) => {
        const { key } = event.currentTarget.dataset;
        const isUnselect = unselectedList.includes(key);

        if (isUnselect) {
            dispatch(actions.unselect(unselectedList.filter((i) => i !== key)));
        } else {
            batch(() => {
                dispatch(actions.unselect([...unselectedList, key]));
                dispatch(actions.select(selectedList.filter((i) => i !== key)));
            });
        }
    };

    return (
        <div className={classNames('ProductFilter container', { expand })}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div className="ProductFilter__header" onClick={() => setExpand(!expand)}>
                Фильтр по меню
                <ReactSVG src={filterIcon} className="filter-icon icon-fix" />
            </div>

            <CSSTransition
                in={expand}
                timeout={300}
                classNames="filter-fade"
                unmountOnExit
            >
                <div className="ProductFilter__content">
                    {filterItems.map((compound) => {
                        const selected = selectedList.includes(compound);
                        const unselected = unselectedList.includes(compound);
                        const capCompound = _.capitalize(compound);

                        return (
                            <div
                                className={classNames('ProductFilter__item', { selected }, { unselected })}
                                key={compound}
                            >
                                <ReactSVG
                                    src={dislikeIcon}
                                    className="dislike-icon filter-icon icon-fix"
                                    onClick={onUnselect}
                                    data-key={compound}
                                />
                                <ReactSVG
                                    src={likeIcon}
                                    className="like-icon filter-icon icon-fix"
                                    onClick={onSelect}
                                    data-key={compound}
                                />
                                <span className="item-title">{capCompound}</span>
                            </div>
                        );
                    })}
                </div>
            </CSSTransition>
        </div>
    );
};

export default ProductFilter;
