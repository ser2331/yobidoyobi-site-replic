import React, { useState } from 'react';
import { Input } from 'antd';
import { ReactSVG } from 'react-svg';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import * as _ from 'lodash';
import FakeData from '../../fake-data';
import CustomCheckbox from '../custom-checkbox';
import PageNavigation from '../page-navigation';
import profileIcon from '../../assets/images/profil-icon.svg';
import settingIcon from '../../assets/images/setting-icon.svg';
import deliveryIcon from '../../assets/images/delivery-icon.svg';
import historyIcon from '../../assets/images/history-icon.svg';
import penIcon from '../../assets/images/edit.svg';
import selectorIcon from '../../assets/images/selector.svg';
import selectorRight from '../../assets/images/selector-right.svg';
import loadMoreIcon from '../../assets/images/loading-more.svg';

import './personal-area-content.scss';

const { deliveryAddress, historyDelivery } = FakeData;

const PersonalAreaContent = () => {
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));

    const large = appSize === 'large';
    const desktop = appSize === 'desktop';
    const tablet = appSize === 'tablet';
    const mobile = appSize === 'mobile';

    const columns = [
        {
            title: 'Номер заказа',
            dataIndex: 'id',
        },
        {
            title: 'Состав',
            dataIndex: 'composition',
        },
        {
            title: 'Адрес доставки',
            dataIndex: 'address',
        },
        {
            title: 'Время оформления',
            dataIndex: 'time',
        },
        {
            title: mobile ? 'Ожидание' : 'Время ожидания',
            dataIndex: 'waitingTime',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
        },
        {
            title: ' ',
            dataIndex: 'pop-up',
        },
    ];

    const [selectedList, setSelectedList] = useState([]);
    const [isActiveName, setActiveName] = useState(false);
    const [name, setName] = useState('Пётр');
    const [isActiveMail, setActiveMail] = useState(false);
    const [mail, setMail] = useState('petr_1@mail.ru');
    const [isActiveDate, setActiveDate] = useState(false);
    const [date, setDate] = useState('01.01.1995');

    const onSelect = (id) => {
        const isSelect = selectedList.includes(id);

        if (isSelect) {
            setSelectedList(selectedList.filter((i) => i !== id));
        } else {
            setSelectedList([...selectedList, id]);
        }
    };

    const renderProfile = () => (
        <div className="PersonalAreaContent__cart wrap-profile">
            <div className="name-cart">
                <ReactSVG src={profileIcon} />
                <span>Мой профиль</span>
            </div>
            <div className="profile-content">
                <div className="PersonalAreaContent__meaning">
                    <div className="PersonalAreaContent__title">Номер телефона:</div>

                    <div className="phone-number">7 (7777) 787 794 65</div>
                </div>
                <div className="PersonalAreaContent__meaning">
                    <div className="PersonalAreaContent__title">Имя:</div>

                    <div className="user-data-wrapper">
                        <Input
                            value={name}
                            style={{ padding: '0 8', color: 'var(--ui-dark)' }}
                            onPressEnter={() => setActiveName(!isActiveName)}
                            bordered={isActiveName}
                            disabled={!isActiveName}
                            onChange={(e) => setName(e.target.value)}
                            className="user-data"
                        />
                    </div>

                    <ReactSVG src={penIcon} onClick={() => setActiveName(!isActiveName)} />
                </div>
                <div className="PersonalAreaContent__meaning">
                    <div className="PersonalAreaContent__title">Почта:</div>

                    <div className="user-data-wrapper">
                        <Input
                            value={mail}
                            style={{ padding: '0 8', color: 'var(--ui-dark)' }}
                            onPressEnter={() => setActiveMail(!isActiveMail)}
                            bordered={isActiveMail}
                            disabled={!isActiveMail}
                            onChange={(e) => setMail(e.target.value)}
                            className="user-data"
                        />
                    </div>

                    <ReactSVG src={penIcon} onClick={() => setActiveMail(!isActiveMail)} />
                </div>
                <div className="PersonalAreaContent__meaning">
                    <div className="PersonalAreaContent__title">Дата рождения:</div>

                    <div className="user-data-wrapper">
                        <Input
                            value={date}
                            style={{ padding: '0 8', color: 'var(--ui-dark)' }}
                            onPressEnter={() => setActiveDate(!isActiveDate)}
                            bordered={isActiveDate}
                            disabled={!isActiveDate}
                            onChange={(e) => setDate(e.target.value)}
                            className="user-data"
                        />
                    </div>

                    <ReactSVG src={penIcon} onClick={() => setActiveDate(!isActiveDate)} />
                </div>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="PersonalAreaContent__cart wrap-settings">
            <div className="name-cart">
                <ReactSVG src={settingIcon} />
                <span>Настройки</span>
            </div>

            <div className="settings-content">
                <div className="PersonalAreaContent__title">Получать новости:</div>

                <div className="agreement">
                    <CustomCheckbox
                        onChange={() => {
                        }}
                        checked
                    />
                    <span>Да, я согласен</span>
                </div>

            </div>
        </div>
    );

    const renderComposition = (composition, id) => (
        <div className="composition-order">
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div className="composition-first" key={composition[0].key} onClick={() => onSelect(id)}>
                {`${composition[0].title} - ${composition[0].number} порции`}
            </div>
            <CSSTransition
                in={selectedList.includes(id)}
                timeout={300}
                classNames="rest-fade"
                unmountOnExit
            >
                <div className="composition-order__content">
                    {composition.slice(1).map(({ key, title, number }) => (
                        <div key={key}>
                            {`${title} - ${number} порции`}
                        </div>
                    ))}
                </div>
            </CSSTransition>
        </div>
    );

    const renderHistoryDeliveryTable = () => (
        <table className="history-delivery-table">
            <thead>
                <tr>
                    { (desktop || large)
                    && columns.map(({ title, dataIndex }) => <th key={dataIndex}>{title}</th>) }

                    { tablet
                        && columns.filter((el) => el.dataIndex !== 'address'
                        && el.dataIndex !== 'time')
                            .map(({ title, dataIndex }) => (<th key={dataIndex}>{title}</th>))}

                    { mobile
                    && columns.filter((el) => el.dataIndex !== 'address'
                        && el.dataIndex !== 'time' && el.dataIndex !== 'composition'
                    && el.dataIndex !== 'pop-up')
                        .map(({ title, dataIndex }) => (<th key={dataIndex}>{title}</th>))}
                </tr>
            </thead>

            <tbody>
                { historyDelivery.map(({
                    id,
                    deliveryNumber,
                    address,
                    composition,
                    waitingTime,
                    processingTime,
                    status,
                }) => (
                    <tr key={id}>
                        <td valign="top">{deliveryNumber}</td>
                        {!mobile && (
                            <td valign="top">
                                {renderComposition(composition, id)}
                            </td>
                        )}

                        {(desktop || large) && (<td className="address-order" valign="top">{address}</td>)}
                        {(desktop || large) && (<td valign="top">{processingTime}</td>)}

                        <td valign="top">{waitingTime}</td>
                        <td valign="top">
                            {status ? <span className="green-status">Завершен</span>
                                : <span className="gold-status">В пути</span>}
                        </td>

                        {!mobile && (
                            <td className="select-delivery" valign="top">
                                <ReactSVG
                                    src={selectedList.includes(id) ? selectorIcon : selectorRight}
                                    onClick={() => onSelect(id)}
                                />
                            </td>
                        )}

                    </tr>
                ))}
                <tr>
                    <th colSpan="7">
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                        <div className="loading-more" onClick={() => {}}>
                            <ReactSVG src={loadMoreIcon} />
                            Загрузить еще
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
    );

    return (
        <div className="PersonalAreaContent container">
            <PageNavigation namePage="Личный кабинет" />
            <div className="PersonalAreaContent__name-page">Личный кабинет</div>
            <div className="PersonalAreaContent__office-management">

                <div className="profile-container">
                    {renderProfile()}
                    {renderSettings()}
                </div>

                <div className="PersonalAreaContent__cart wrap-delivery">
                    <div className="name-cart">
                        <ReactSVG src={deliveryIcon} />
                        <span>Адреса доставки</span>
                    </div>

                    {deliveryAddress.map(({ address, id }) => (
                        <div key={id} className="PersonalAreaContent__meaning">
                            {address}
                        </div>
                    ))}

                </div>

            </div>
            <div className="PersonalAreaContent__cart">
                <div className="name-cart">
                    <ReactSVG src={historyIcon} />
                    <span>История заказов</span>
                </div>

                {renderHistoryDeliveryTable()}
            </div>
        </div>
    );
};

export default PersonalAreaContent;
