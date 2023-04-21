import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { app as appActions } from '../../store/actions';
import { getFilteredItems } from '../../selectors/selectors';
import Footer from '../footer';
import Header from '../header';
// import ProductFilter from '../../components/product-filter';
import ProductGroup from '../../components/product-group';
import ProductGroupSelector from '../../components/product-group-selector';
import ProductModal from '../../components/product-modal';
import ProductSlider from '../../components/product-slider';
import ProgressBar from '../../components/progress-bar';
import ScrollTop from '../../components/scroll-top';
import GiftModal from '../../components/gift-modal';
import SleepModal from '../../components/sleep-modal';
import UserOrders from '../../components/user-orders';

import './home.scss';

const initialModalId = {
    group: '',
    item: '',
};

const Home = () => {
    const [modalId, setModalId] = useState(initialModalId);

    const showGadgetMenu = useSelector((state) => _.get(state, 'app.showGadgetMenu', false));
    const showSleepModal = useSelector((state) => _.get(state, 'app.showSleepModal', false));
    const showGiftModal = useSelector((state) => _.get(state, 'app.showGiftModal', false));
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const groups = useSelector(getFilteredItems);
    const city = useSelector((state) => _.get(state, 'app.city'));
    const organizationData = useSelector((state) => _.get(state, 'organization.organizationData'));
    // const isStage = useSelector((state) => _.get(state, 'app.isStage', false));
    const isAuth = useSelector((state) => _.get(state, 'app.isAuth'));
    const dispatch = useDispatch();

    const { is_working, id: organizationId } = organizationData;
    const isSleep = organizationId && !is_working;
    // const isSleep = organizationId && !is_working && isStage;

    const mobile = appSize === 'mobile';

    useEffect(() => {
        document.body.style.overflow = showGadgetMenu ? 'hidden' : 'visible';
    }, [showGadgetMenu]);

    useEffect(() => {
        if (isSleep) {
            dispatch(appActions.showSleepModal(true));
        }
    }, [dispatch, city, isSleep]);

    const closeModal = () => setModalId(initialModalId);

    return (
        <div className="Home">
            <Header />
            <ProductGroupSelector />
            <ProductSlider />
            {isAuth && <UserOrders />}
            {/* <ProductFilter /> */}
            {groups.map((group) => (group.items.length ? (
                <ProductGroup
                    group={group}
                    key={group.id}
                    setModal={setModalId}
                />
            ) : ''))}
            <ProductModal modalId={modalId} onClose={closeModal} />
            <Footer />
            {!mobile && <ScrollTop />}
            {(!mobile && city.id && organizationData.id) ? <ProgressBar /> : ''}
            {showGiftModal && !mobile && <GiftModal />}
            {showSleepModal && <SleepModal />}
        </div>
    );
};

export default Home;
