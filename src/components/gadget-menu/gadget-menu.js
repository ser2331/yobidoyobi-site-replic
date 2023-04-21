import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Drawer } from 'antd';
import * as _ from 'lodash';
import classNames from 'classnames';
import Types from '../../classes/types';
import Logo from '../logo';
import CitySelector from '../city-selector';
import googlePlayIcon from '../../assets/images/google-play-gadget.svg';
import appleStoreIcon from '../../assets/images/app-store-gadget.svg';
import { app as appActions } from '../../store/actions';
import closeIcon from '../../assets/images/close-menu.svg';
import callIcon from '../../assets/images/call-icon.svg';
import enterIcon from '../../assets/images/user-enter.svg';

import './gadget-menu.scss';

const { routingMap } = Types;

const GadgetMenu = () => {
    const showGadgetMenu = useSelector((state) => _.get(state, 'app.showGadgetMenu', false));
    const currentUserData = useSelector((state) => _.get(state, 'app.currentUserData'));
    const city = useSelector((state) => _.get(state, 'app.city'));
    const isAuth = useSelector((state) => _.get(state, 'app.isAuth'));
    const dispatch = useDispatch();

    const onDirectorsFeedback = () => {
        dispatch(appActions.showDirectorsFeedback(true));
        dispatch(appActions.showGadgetMenu(false));
    };
    const onCallMe = () => {
        dispatch(appActions.showCallMe(true));
        dispatch(appActions.showGadgetMenu(false));
    };
    const onAuth = () => {
        if (isAuth) {
            dispatch(appActions.appLogout());
        } else {
            dispatch(appActions.showAuth(true));
        }
        dispatch(appActions.showGadgetMenu(false));
    };

    const mapLink = (path = routingMap.get('location').path) => {
        const { slug } = city;
        return slug ? `/${slug}${path}` : routingMap.get('location').path;
    };

    const routes = [
        {
            title: isAuth ? (
                <div className="user-name-wrapper">
                    <span>{currentUserData?.name}</span>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                    <span onClick={onAuth}>Выход</span>
                </div>
            ) : 'Вход и регистрация',
            onClick: () => { if (!isAuth) onAuth(); },
            type: 'auth',
        },
        {
            title: 'Перезвоните мне',
            onClick: () => onCallMe(),
            type: 'call',
        },
        {
            title: 'Акции',
            link: routingMap.get('stocks').path,
        },
        {
            title: 'Франшиза',
            link: '/',
        },
    ];

    const links = [
        {
            title: 'Инвестиции',
            link: '/',
        },
        {
            title: 'Написать директору',
            onClick: () => onDirectorsFeedback(),
        },
        {
            title: 'Правовые документы',
            link: routingMap.get('legalDocuments').path,
        },
    ];

    return (
        <div className="GadgetMenu">
            <Drawer
                placement="top"
                height={document.documentElement.clientHeight}
                closable={false}
                visible={showGadgetMenu}
                className="GadgetMenu__wrapper"
            >
                <div className="GadgetMenu__content container">
                    <div className="GadgetMenu__header">
                        <div className="header-gadget container">
                            <div className="left-zone">
                                <Logo colorsInverse />
                            </div>
                            <button
                                type="button"
                                onClick={() => dispatch(appActions.showGadgetMenu(false))}
                                className="right-zone"
                            >
                                <ReactSVG src={closeIcon} />
                            </button>
                        </div>
                    </div>
                    <CitySelector />

                    <div className="GadgetMenu__foot">
                        <div className="routes">
                            {routes.map((route) => (
                                <div className="route" key={route.title}>
                                    <div className="route-icon">
                                        {route.type === 'auth' && <ReactSVG src={enterIcon} />}
                                        {route.type === 'call' && <ReactSVG onClick={onCallMe} src={callIcon} />}
                                    </div>
                                    {route.onClick
                                        ? (
                                            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                                            <div className={classNames('title', { auth: route.type === 'auth' })} onClick={route.onClick}>
                                                {route.title}
                                            </div>
                                        )
                                        : (
                                            <Link className="title" to={mapLink(route.link)} onClick={() => dispatch(appActions.showGadgetMenu(false))}>
                                                {route.title}
                                            </Link>
                                        )}
                                </div>
                            ))}
                        </div>

                        <div className="links">
                            {links.map((link) => (
                                <div className="link" key={link.title}>

                                    <div className="route-icon">
                                        {link.title === 'Вход и регистрация' && <ReactSVG src={enterIcon} />}
                                    </div>

                                    {link.onClick
                                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                                        ? <span onClick={link.onClick}>{link.title}</span>
                                        : (
                                            <Link to={mapLink(link.link)} onClick={() => dispatch(appActions.showGadgetMenu(false))}>
                                                {link.title}
                                            </Link>
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="basket-divider" />

                    <div className="GadgetMenu__systems">
                        <a href="https://play.google.com/store/apps/details?id=ru.ebidoebi.ebi&hl=en">
                            <ReactSVG src={googlePlayIcon} className="store-icon" />
                        </a>

                        {/* eslint-disable-next-line max-len */}
                        <a href="https://apps.apple.com/tt/app/%D1%91%D0%B1%D0%B8%D0%B4%D0%BE%D1%91%D0%B1%D0%B8-%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D1%80%D0%BE%D0%BB%D0%BB%D0%BE%D0%B2/id1482373099?ign-mpt=uo%3D2">
                            <ReactSVG src={appleStoreIcon} className="store-icon" />
                        </a>
                    </div>

                </div>
            </Drawer>
        </div>
    );
};

export default GadgetMenu;
