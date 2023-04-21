import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Types from '../../classes/types';
import AboutCompany from '../about-company';
import Basket from '../basket';
import DeliveryMap from '../delivery-map';
import Home from '../home';
import LegalDocuments from '../legal-documents';
import PersonalArea from '../personal-area';
import Plug from '../plug';
import ProductCard from '../product-card';
import Stocks from '../stocks';
import UserLocation from '../user-location';

const { routingMap } = Types;

const RoutesList = () => (
    <Routes>
        <Route path={routingMap.get('location').path} element={<UserLocation />} exact />
        <Route path={routingMap.get('home').slugPath} element={<Home />} exact />
        <Route path={routingMap.get('basket').slugPath} element={<Basket />} exact />
        <Route path={routingMap.get('stocks').slugPath} element={<Stocks />} exact />
        <Route path={routingMap.get('aboutCompany').slugPath} element={<AboutCompany />} exact />
        <Route path={routingMap.get('personalArea').slugPath} element={<PersonalArea />} exact />
        <Route path={routingMap.get('legalDocuments').slugPath} element={<LegalDocuments />} exact />
        <Route path={routingMap.get('productCard').slugPath} element={<ProductCard />} exact />
        <Route path={routingMap.get('deliveryMap').slugPath} element={<DeliveryMap />} exact />
        <Route path={routingMap.get('plug').path} element={<Plug />} exact />
        <Route path="*" element={<div className="PageNotFount">Страница не найдена...</div>} />
    </Routes>
);

export default RoutesList;
