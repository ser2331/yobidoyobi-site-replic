import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import * as _ from 'lodash';
import Types from '../../classes/types';
import PlugContent from '../../components/plug-content';

import './plug.scss';

const { appSizesMap, routingMap } = Types;

const Plug = () => {
    const appSize = useSelector((state) => _.get(state, 'app.appSize', ''));
    const navigate = useNavigate();
    const location = useLocation();

    const { pathname } = location;
    const isShowPluPage = appSize === appSizesMap.get('plug').key;

    useEffect(() => {
        if (!isShowPluPage && (pathname === routingMap.get('plug').path)) {
            navigate(routingMap.get('location').path);
        }
    }, [isShowPluPage, pathname, navigate]);

    return (
        <div className="Plug">
            <PlugContent />
        </div>
    );
};

export default Plug;
