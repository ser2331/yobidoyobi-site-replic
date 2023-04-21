let AppConfig = {};

switch (process.env.REACT_APP_ENV) {
case 'production': {
    AppConfig = require('./production/config').default;
    break;
}

case 'prod': {
    AppConfig = require('./production/config').default;
    break;
}

case 'stage': {
    AppConfig = require('./stage/config').default;
    break;
}

case 'test': {
    AppConfig = require('./test/config').default;
    break;
}

default: AppConfig = {};
}

export default ({ apiDomain: 'test', ...AppConfig });
