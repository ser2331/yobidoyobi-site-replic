import React, { useState } from 'react';
import { Modal } from 'antd';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import closeIcon from '../../../../assets/images/close.svg';
import searchIcon from '../../../../assets/images/search.svg';
import logo from '../../../../assets/images/logo.svg';

import './city-selector-modal.scss';

const CitySelectorModal = ({
    visible,
    onClose,
    citiesList,
    selectedCity,
    onSelect,
}) => {
    const [searchKey, setSearchKey] = useState('');

    const topList = citiesList.filter((c) => c.is_top);

    const onCloseModal = () => {
        setSearchKey('');
        onClose();
    };

    const onSelectCity = (item) => {
        onSelect(item);
        setSearchKey('');
        onClose();
    };

    const getFilteredList = () => {
        if (!searchKey) return citiesList;

        return citiesList.filter(({ name }) => name.toLowerCase().includes(searchKey.toLowerCase()));
    };

    return (
        <Modal
            visible={visible}
            onCancel={onCloseModal}
            footer={null}
            closeIcon={<ReactSVG src={closeIcon} className="close-icon" />}
            wrapClassName="CitySelector__modal-wrap"
            centered
        >
            <div className="CitySelector__modal">
                <div className="logo-wrapper">
                    <ReactSVG src={logo} />
                </div>

                <div className="title">
                    Выберите свой город
                </div>

                <div className="search-wrapper">
                    <input
                        name="city-search"
                        className="search-input"
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        placeholder="Поиск города"
                    />

                    <ReactSVG src={searchIcon} className="search-icon icon-fix" />
                </div>

                {!!topList.length && (
                    <div className="top-list">
                        {topList.map((item) => (
                            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                            <span
                                key={item.id}
                                className="top-list__item"
                                onClick={() => onSelectCity(item)}
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                )}

                <div className="cities-list">
                    {getFilteredList().map((item, idx) => (item.redirect ? (
                        <a
                            key={item.id || idx + 1000}
                            href={`/${item.slug}`}
                            className={classNames('cities-list__item', { selected: item.value === selectedCity.value })}
                        >
                            {item.name}
                        </a>
                    ) : (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                        <div
                            key={item.id || idx + 1000}
                            className={classNames('cities-list__item', { selected: item.value === selectedCity.value })}
                            onClick={() => onSelectCity(item)}
                        >
                            {item.name}
                        </div>
                    )))}
                </div>
            </div>
        </Modal>
    );
};

CitySelectorModal.defaultProps = {
    onClose: () => {},
    selectedCity: {},
};

CitySelectorModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    citiesList: PropTypes.array.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    selectedCity: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
};

export default CitySelectorModal;
