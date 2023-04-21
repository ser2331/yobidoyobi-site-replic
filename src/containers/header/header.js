import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { ReactSVG } from 'react-svg';
import { app as appActions } from '../../store/actions';
import Types from '../../classes/types';
import GadgetMenu from '../../components/gadget-menu';
import CitySelector from '../../components/city-selector';
import CustomButton from '../../components/custom-button';
import Logo from '../../components/logo';
import SocialLinks from '../../components/social-links';
import PromoCode from '../../components/promo-code';
import menu from '../../assets/images/menu.svg';

import './header.scss';

const { appSizesMap } = Types;

const Header = () => {
    const dispatch = useDispatch();
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const currentUserData = useSelector((state) => _.get(state, 'app.currentUserData'));
    const isAuth = useSelector((state) => _.get(state, 'app.isAuth'));

    const large = appSize === appSizesMap.get('large').key;
    const desktop = appSize === appSizesMap.get('desktop').key;
    const tablet = appSize === appSizesMap.get('tablet').key;
    const mobile = appSize === appSizesMap.get('mobile').key;

    const HeaderLarge = () => (
        <div className="Header container">
            <div className="Header__left-zone">
                <Logo />

                <CitySelector />

                <div className="Header__buttons-wrapper">
                    <PromoCode isHeader />

                    <button
                        className="Header__call-me"
                        onClick={() => dispatch(appActions.showCallMe(true))}
                        type="button"
                    >
                        Перезвоните мне
                    </button>
                </div>
            </div>
            <div className="Header__right-zone">
                <SocialLinks />

                {isAuth
                    ? (
                        <div className="Header__user">
                            <div className="user-name-wrapper">
                                <span className="user-name">{currentUserData?.name}</span>
                                <span className="user-name">{currentUserData?.phone}</span>
                            </div>

                            <CustomButton onClick={() => dispatch(appActions.logout())}>
                                выход
                            </CustomButton>
                        </div>
                    )
                    : (
                        <CustomButton
                            onClick={() => dispatch(appActions.showAuth(true))}
                            className="Header__auth-button"
                        >
                            Вход
                        </CustomButton>
                    )}
            </div>
        </div>

    );

    const HeaderGadget = () => (
        <div className="Header-gadget">
            <div className="Header-gadget__container container">
                <div className="Header-gadget__left-zone">
                    <Logo />
                </div>

                <PromoCode isHeader />

                <button
                    type="button"
                    onClick={() => dispatch(appActions.showGadgetMenu(true))}
                    className="Header-gadget__right-zone"
                >
                    <ReactSVG src={menu} />
                </button>
            </div>
        </div>
    );

    return (
        <div>
            { (large || desktop) && <HeaderLarge /> }
            { (tablet || mobile) && <HeaderGadget /> }
            { (tablet || mobile) && <GadgetMenu /> }
        </div>
    );
};

export default Header;
