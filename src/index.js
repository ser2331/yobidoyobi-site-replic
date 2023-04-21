import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';
import { YMInitializer } from 'react-yandex-metrika';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/app/app';
import store from './store/store';
// styles
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './assets/styles/index.scss';

const tagManagerArgs = {
    gtmId: 'GTM-PWW8XBZ',
};
TagManager.initialize(tagManagerArgs);

ReactGA.initialize('UA-141896696-1');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
    <Provider store={store}>
        <YMInitializer
            accounts={[89126096]}
            options={{
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
            }}
            version="2"
        />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);
