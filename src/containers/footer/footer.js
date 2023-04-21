import React from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { app as appActions } from '../../store/actions';
import Types from '../../classes/types';
import Logo from '../../components/logo';
import Mailing from './components';
import SocialLinks from '../../components/social-links';
import googlePlayIcon from '../../assets/images/google-play.svg';
import appleStoreIcon from '../../assets/images/app-store.svg';
import mirIcon from '../../assets/images/payment/mir.svg';
import visaIcon from '../../assets/images/payment/visa.svg';
import masterCardIcon from '../../assets/images/payment/master-card.svg';
import applePayIcon from '../../assets/images/payment/apple-pay.svg';
import androidPayIcon from '../../assets/images/payment/android-pay.svg';

import './footer.scss';

const { routingMap } = Types;

const Footer = () => {
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const organization = useSelector((state) => _.get(state, 'organization.organizationData'));
    const organizationsList = useSelector((state) => _.get(state, 'organization.organizationsList'));
    const city = useSelector((state) => _.get(state, 'app.city'));

    const dispatch = useDispatch();

    const tablet = appSize === 'tablet';
    const mobile = appSize === 'mobile';

    const onDirectorsFeedback = () => dispatch(appActions.showDirectorsFeedback(true));

    const mapLink = (path = routingMap.get('location').path) => {
        const { slug } = city;
        return slug ? `/${slug}${path}` : routingMap.get('location').path;
    };

    const currentProfit = 106967735;
    const lastProfit = 148226204;
    const routes = [
        {
            title: 'О компании',
            link: mapLink(routingMap.get('aboutCompany').path),
        },
        {
            title: 'Доставка',
            link: mapLink(routingMap.get('deliveryMap').path),
        },
        {
            title: 'Акции',
            link: mapLink(routingMap.get('stocks').path),
        },
        {
            title: 'Франшиза',
            blankLink: 'https://франшизаёбидоёби.рф/2021',
        },
    ];

    const links = [
        {
            title: 'Инвестиции',
            blankLink: 'https://drive.google.com/file/d/1t9MAIhGcJouDvoUfk-PzA_ORudClMDFV/view',
            noTablet: true,
        },
        {
            title: 'Написать директору',
            onClick: () => onDirectorsFeedback(),
            noTablet: true,
        },
        {
            title: 'Правовые документы',
            link: mapLink(routingMap.get('legalDocuments').path),
        },
    ];

    const customSort = (a, s) => a.sort((x1, x2) => {
        const i1 = s.indexOf(x1.title);
        const i2 = s.indexOf(x2.title);
        // eslint-disable-next-line no-nested-ternary
        return i1 < 0 ? 1 : (i2 < 0) ? -1 : i1 - i2;
    });

    const renderRouterWrapper = (route, routeStyle) => {
        const { title, link, blankLink, onClick } = route;
        return (
            <div className={routeStyle} key={title}>
                {/* eslint-disable-next-line no-nested-ternary */}
                {onClick
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    ? <span onClick={onClick}>{title}</span>
                    : blankLink
                        ? <a href={blankLink} target="_blank" rel="noreferrer">{title}</a>
                        : <Link to={link}>{title}</Link>}
            </div>
        );
    };

    const renderRoutes = () => (
        <div className="left-container foot">
            <div className="Footer__routes">
                {!tablet ? (
                    routes.map((route) => (renderRouterWrapper(route, 'Footer__route')))
                ) : (
                    customSort(routes, ['О компании', 'Акции', 'Доставка', 'Франшиза']).map((route) => (renderRouterWrapper(route, 'Footer__route')))
                )}
            </div>

            <div className="Footer__links">
                {!tablet ? (
                    links.map((link) => (renderRouterWrapper(link, 'Footer__link')))
                ) : (
                    links.filter((l) => !l.noTablet).map((link) => (renderRouterWrapper(link, 'Footer__link')))
                )}
            </div>
        </div>
    );

    const renderContacts = () => (
        <div className="Footer__contacts">
            <div className="Footer__tel">
                <a href={`tel:${organization.phone}`}>
                    {organization.phone}
                </a>
            </div>

            <div className="Footer__current-status">узнать свой статус заказа:</div>

            <div className="Footer__tel">
                <a href="tel:8 800 333 33 23">8 800 333 33 23</a>
            </div>

            <div className="Footer__address">
                {organizationsList.filter((i) => i.address).map((org) => (
                    <div className="address" key={org.id}>{org.address}</div>
                ))}
            </div>

            <div className="Footer__map">
                <Link to={mapLink(routingMap.get('deliveryMap').path)}>Смотреть на карте</Link>
            </div>
        </div>
    );

    const FooterLarge = () => (
        <>
            <div className="Footer__row">
                <Logo colorsInverse />

                <div className="Footer__routes">
                    {routes.map((route) => (renderRouterWrapper(route, 'Footer__route')))}
                </div>

                <div className="Footer__links">
                    {links.map((link) => (renderRouterWrapper(link, 'Footer__link')))}
                </div>

                {renderContacts()}

                <Mailing />
            </div>

            <div className="Footer__row">
                <div className="left-zone">
                    <a href="https://play.google.com/store/apps/details?id=ru.ebidoebi.ebi&hl=en">
                        <ReactSVG src={googlePlayIcon} className="store-icon" />
                    </a>

                    {/* eslint-disable-next-line max-len */}
                    <a href="https://apps.apple.com/tt/app/%D1%91%D0%B1%D0%B8%D0%B4%D0%BE%D1%91%D0%B1%D0%B8-%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D1%80%D0%BE%D0%BB%D0%BB%D0%BE%D0%B2/id1482373099?ign-mpt=uo%3D2">
                        <ReactSVG src={appleStoreIcon} className="store-icon" />
                    </a>

                    <div className="profit">
                        {`Выручка российской сети в этом месяце ${currentProfit.toLocaleString()} ₽.`}
                        <br />
                        {`В прошлом — ${lastProfit.toLocaleString()} ₽`}
                        <br />
                        {organization.legal_info ? organization.legal_info.info : ''}
                    </div>
                </div>
                <div className="right-zone">
                    <div className="payment-title">
                        Мы работаем с:
                    </div>
                    <div className="payment-icons">
                        <ReactSVG src={mirIcon} className="payment-icon" />
                        <ReactSVG src={visaIcon} className="payment-icon" />
                        <ReactSVG src={masterCardIcon} className="payment-icon" />
                        <ReactSVG src={applePayIcon} className="payment-icon" />
                        <ReactSVG src={androidPayIcon} className="payment-icon" />
                    </div>
                </div>
            </div>

            <div className="Footer__row">
                <div className="left-zone">
                    <div className="corp">
                        © 2022, ЁбиДоёби
                    </div>
                </div>

                <div className="right-zone">
                    <SocialLinks />
                </div>
            </div>
        </>
    );

    const FooterGadget = () => (
        <>
            <div className="Footer__row">
                <div className="left-container">

                    {!mobile && (
                        <div className="Logo inverse">
                            <Logo colorsInverse />

                            <div className="Logo__description">
                                <div className="Logo__delivery">
                                    Доставка суши и роллов
                                </div>
                                <div className="Logo__city">
                                    {`в ${city.name_prepositional}` || ''}
                                </div>
                            </div>
                        </div>
                    )}

                    {renderRoutes()}

                </div>
                <div className="right-container">
                    {renderContacts()}

                    {mobile ? <Mailing /> : ''}
                </div>
            </div>

            {tablet ? <Mailing /> : ''}

            <div className="Footer__row social-menu">
                <div className="left-zone">
                    <div className="systems">
                        <a href="https://play.google.com/store/apps/details?id=ru.ebidoebi.ebi&hl=en">
                            <ReactSVG src={googlePlayIcon} className="store-icon" />
                        </a>

                        {/* eslint-disable-next-line max-len */}
                        <a href="https://apps.apple.com/tt/app/%D1%91%D0%B1%D0%B8%D0%B4%D0%BE%D1%91%D0%B1%D0%B8-%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D1%80%D0%BE%D0%BB%D0%BB%D0%BE%D0%B2/id1482373099?ign-mpt=uo%3D2">
                            <ReactSVG src={appleStoreIcon} className="store-icon" />
                        </a>
                    </div>

                    <div className="profit">
                        {`Выручка российской сети в этом месяце ${currentProfit.toLocaleString()} ₽.`}
                        <br />
                        {`В прошлом — ${lastProfit.toLocaleString()} ₽`}
                        <br />
                        {organization.legal_info ? organization.legal_info.info : ''}
                    </div>
                </div>
                <div className="right-zone">
                    <div className="payment-title">
                        Мы работаем с:
                    </div>
                    <div className="payment-icons">
                        <ReactSVG src={mirIcon} className="payment-icon" />
                        <ReactSVG src={visaIcon} className="payment-icon" />
                        <ReactSVG src={masterCardIcon} className="payment-icon" />
                        <ReactSVG src={applePayIcon} className="payment-icon" />
                        <ReactSVG src={androidPayIcon} className="payment-icon" />
                    </div>
                </div>
            </div>

            <div className="Footer__row social-links">
                <div className="left-zone">
                    <div className="corp">
                        © 2022, ЁбиДоёби
                    </div>
                </div>

                <div className="right-zone">
                    <SocialLinks />
                </div>
            </div>
        </>
    );

    return (
        <div className="Footer container gadget-footer">
            {(tablet || mobile) ? <FooterGadget /> : <FooterLarge />}
        </div>
    );
};

export default Footer;
