import React, { useEffect, useMemo } from 'react';
import { batch, useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import * as _ from 'lodash';
import { app as appActions, organization as organizationActions, products as productActions, basket as basketActions } from '../../store/actions';
import ApiService from '../../classes/api-service';
import Types from '../../classes/types';
import CheckToken from '../../classes/checkToken';
import ErrorModal from '../../components/error-modal';
import RoutesList from '../routes-list';
import { ScrollToTop } from '../../utils';
import AddressModal from '../../components/address-modal';
import AuthModal from '../../components/auth-modal';
import CallMeModal from '../../components/call-me-modal';
import DirectorsFeedbackModal from '../../components/directors-feedback-modal';
import NoOrganizationModal from '../../components/no-organization-modal';

import './app.scss';

const { appSizesMap, routingMap, minimalUpdateTokenTime, oldFrontCitiesList } = Types;

const App = () => {
    const appReady = useSelector((state) => _.get(state, 'app.appReady', false));
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const city = useSelector((state) => _.get(state, 'app.city'));
    const organizationData = useSelector((state) => _.get(state, 'organization.organizationData'));
    const currentOrganizationId = useSelector((state) => _.get(state, 'organization.currentOrganizationId'));
    const isAuth = useSelector((state) => _.get(state, 'app.isAuth'));
    const accessToken = useSelector((state) => _.get(state, 'app.accessToken'));
    const refreshTokenExpiresDateStamp = useSelector((state) => _.get(state, 'app.refreshTokenExpiresDateStamp'));
    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));
    const showAddressModal = useSelector((state) => _.get(state, 'app.showAddressModal', false));
    const showAuth = useSelector((state) => _.get(state, 'app.showAuth', false));
    const showCallMe = useSelector((state) => _.get(state, 'app.showCallMe', false));
    const showDirectorsFeedback = useSelector((state) => _.get(state, 'app.showDirectorsFeedback', false));
    const showNoOrganizationModal = useSelector((state) => _.get(state, 'app.showNoOrganizationModal', false));

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const apiService = new ApiService(city.slug || 'krasnoyarsk');

    const { pathname } = location;
    const { id } = organizationData;
    const { cartId } = currentBasket;
    const isShowPluPage = appSize === appSizesMap.get('plug').key;

    const checkToken = useMemo(() => new CheckToken(), []);

    useEffect(() => {
        if (!isAuth && ((refreshTokenExpiresDateStamp - +new Date()) > minimalUpdateTokenTime)) {
            dispatch(appActions.getNewToken());
        }
    }, [isAuth, refreshTokenExpiresDateStamp, dispatch]);

    useEffect(() => {
        if (cartId) {
            dispatch(basketActions.getCurrentBasket());
        }
    }, [cartId, dispatch]);

    useEffect(() => {
        if (isAuth && accessToken) {
            checkToken.init();
            dispatch(basketActions.getUserAddresses());
            dispatch(appActions.getCurrentUserData());
            dispatch(basketActions.getUserOrders());
            return;
        }
        checkToken.stop();
        // eslint-disable-next-line consistent-return
        return () => checkToken.stop();
    }, [isAuth, checkToken, accessToken, dispatch]);

    useEffect(() => {
        if (isShowPluPage && (pathname !== routingMap.get('plug').path)) {
            navigate(routingMap.get('plug').path);
        }
    }, [navigate, isShowPluPage, pathname]);

    useEffect(() => {
        apiService.getCitiesList()
            .then((citiesListResponse) => {
                if (citiesListResponse.status === 200) {
                    const list = (citiesListResponse.data.data || []).map((item) => ({ ...item, redirect: true }));
                    const fullCitiesList = [...oldFrontCitiesList, ...list].sort((a, b) => (a.name > b.name ? 1 : -1));
                    dispatch(appActions.setCitiesList(fullCitiesList));
                    const cityDomain = pathname.split('/')[1];

                    if (list.length) {
                        const currentCity = list.find((item) => item.slug === cityDomain);
                        if (currentCity) {
                            batch(() => {
                                dispatch(organizationActions.getOrganizations(currentCity));
                                dispatch(appActions.setAppReady(true));
                                document.title = `Ёбидоёби - Доставка суши и роллов в ${currentCity.name_prepositional}`;
                            });
                        } else {
                            navigate(routingMap.get('location').path);
                        }
                    }
                }
            })
            .catch(() => dispatch(appActions.setAppError('Не удалось получить список городов. Попробуйте пожалуйста ещё раз')));
    }, [dispatch]);

    useEffect(() => {
        if (appReady && id && id !== currentOrganizationId) {
            dispatch(productActions.getGroups());
            dispatch(appActions.getSliders());
        }
    }, [appReady, id, currentOrganizationId, dispatch]);

    useEffect(() => {
        const getSizeKey = () => {
            const size = document.documentElement.clientWidth;
            if (size < appSizesMap.get('mobile').size) return appSizesMap.get('plug').key;
            if (size >= appSizesMap.get('large').size) return appSizesMap.get('large').key;
            if (size >= appSizesMap.get('desktop').size) return appSizesMap.get('desktop').key;
            if (size >= appSizesMap.get('tablet').size) return appSizesMap.get('tablet').key;
            if (size < appSizesMap.get('tablet').size) return appSizesMap.get('mobile').key;
            return appSizesMap.get('desktop').key;
        };

        const onResize = () => {
            const sizeKey = getSizeKey();
            dispatch(appActions.setSize(sizeKey));
        };

        onResize();
        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, [dispatch]);

    return (
        <div className="App">
            <ScrollToTop />
            <RoutesList />
            <ErrorModal />

            {showAuth && <AuthModal />}
            {showCallMe && <CallMeModal />}
            {showAddressModal && <AddressModal />}
            {showDirectorsFeedback && <DirectorsFeedbackModal />}
            {showNoOrganizationModal && <NoOrganizationModal />}
        </div>
    );
};

export default App;
