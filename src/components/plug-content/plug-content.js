import React from 'react';
import { ReactSVG } from 'react-svg';
import Logo from '../logo';
import flipDeviceIcon from '../../assets/images/flip-device.svg';

import './plug-content.scss';

const PlugContent = () => (
    <div className="PlugContent container">

        <Logo disableRedirect />

        <div className="PlugContent__apology">
            <span className="PlugContent__apology__text">Извините! </span>
            Ваше устройство не
            <br />
            поддерживается.
        </div>

        <ReactSVG src={flipDeviceIcon} />
        <div className="PlugContent__request">
            Пожалуйста переверните телефон
            <br />
            или воспользуйтесь другим
            <br />
            устройством
        </div>
    </div>
);

export default PlugContent;
