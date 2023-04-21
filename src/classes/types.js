export default class Types {
    static routing = [
        { id: 0, key: 'location', path: '/' },
        { id: 1, key: 'home', path: '', slugPath: '/:city' },
        { id: 2, key: 'basket', path: '/basket', slugPath: '/:city/basket' },
        { id: 3, key: 'stocks', path: '/stocks', slugPath: '/:city/stocks' },
        { id: 4, key: 'personalArea', path: '/personal-area', slugPath: '/:city/personal-area' },
        { id: 5, key: 'aboutCompany', path: '/about-company', slugPath: '/:city/about-company' },
        { id: 6, key: 'legalDocuments', path: '/legal-documents', slugPath: '/:city/legal-documents' },
        { id: 7, key: 'productCard', path: '/product-card', slugPath: '/:city/product-card' },
        { id: 8, key: 'deliveryMap', path: '/delivery-map', slugPath: '/:city/delivery-map' },
        { id: 9, key: 'plug', path: '/plug' },
    ];

    static routingMap = Types.routing.reduce((acc, item) => acc.set(item.key, { ...item }), new Map());

    static appSizes = [
        { id: 0, key: 'mobile', size: 360 },
        { id: 1, key: 'tablet', size: 768 },
        { id: 2, key: 'desktop', size: 1152 },
        { id: 3, key: 'large', size: 1440 },
        { id: 4, key: 'plug', size: 360 },
    ];

    static appSizesMap = Types.appSizes.reduce((acc, item) => acc.set(item.key, { ...item }), new Map());

    static productIndicator = [
        { id: 0, key: 'hot', type: 'hot' },
        { id: 1, key: 'new', type: 'new' },
        { id: 2, key: 'recommended', type: 'recommended' },
        { id: 3, key: 'spicy', type: 'spicy' },
    ];

    static productIndicatorMap = Types.productIndicator.reduce((acc, item) => acc.set(item.key, { ...item }), new Map());

    static basketStepsSet = [
        { title: 'Корзина', step: 1 },
        { title: 'Оформление', step: 2 },
        { title: 'Заказ принят', step: 3 },
    ];

    static deliveryTypes = [
        { key: 'pickup', type: 'PICKUP', label: 'Самовывоз (-10%)', value: 0 },
        { key: 'delivery', type: 'DELIVERY', label: 'Доставка', value: 1 },
    ];

    static deliveryTypesMap = Types.deliveryTypes.reduce((acc, item) => acc.set(item.key, { ...item }), new Map());

    static deliveryTypesMapByValue = Types.deliveryTypes.reduce((acc, item) => acc.set(item.value, { ...item }), new Map());

    static legalDocuments = [
        {
            id: 0,
            key: 'calorie',
            name: 'Калорийность и составы',
            link: 'https://docs.google.com/spreadsheets/d/1EtFnYspOSkmjjatoq1LhU6wqS0IQQ8vMKEkU_muu84o/edit#gid=1298153098',
        },
        {
            id: 1,
            key: 'stocks',
            name: 'Акции. ЁбидоЁби',
            link: 'https://docs.google.com/document/d/1rdqSJOHFQpTHwZ6PBeO8wTgr0ZvYrORa-ygC6wJpTl8/edit',
        },
        {
            id: 2,
            key: 'userAgreement',
            name: 'Пользовательское соглашение',
            link: 'https://docs.google.com/document/d/14LMP72YtX-es-kB22GbmAsyUku3v0lInQmZdd1X3kbI/edit',
        },
        {
            id: 3,
            key: 'rulesPurchasing',
            name: 'Правила приобретения товаров Ёбидоёби',
            link: 'https://docs.google.com/document/d/1d_zBr8pCZmCK7PtEgIpdkBu08sX4iuEp9qjUvaux97s/edit',
        },
        {
            id: 4,
            key: 'privacyPolicy',
            name: 'Политика конфинденциальности Ёбидоёби',
            link: 'https://docs.google.com/document/d/1_xnoeCTVyuIIoQQa28gWA5w1uA5ibikWlWn7UurKaMg/edit',
        },
    ];

    static paymentOptions = [
        { key: 'cash', name: 'Оплата наличными', type: 0 },
        { key: 'map', name: 'Банковской картой', type: 1 },
        // { key: 'online', name: 'Онлайн на сайте', type: 2 },
    ];

    static paymentOptionsMap = Types.paymentOptions.reduce((acc, item) => acc.set(item.key, { ...item }), new Map());

    static promoCodeOptions = [
        { key: 'isPromo', type: 1 },
        { key: 'notPromo', type: 0 },
    ];

    static promoCodeOptionsMap = Types.promoCodeOptions.reduce((acc, item) => acc.set(item.key, { ...item }), new Map());

    static birthdayOptions = [
        { key: 'birthday', type: 1 },
        { key: 'noBirthday', type: 0 },
    ];

    static birthdayOptionsMap = Types.birthdayOptions.reduce((acc, item) => acc.set(item.key, { ...item }), new Map());

    static localStorage = {
        accessToken: 'ACCESS_TOKEN',
        refreshToken: 'REFRESH_TOKEN',
        accessTokenExpiresIn: 'ACCESS_TOKEN_EXPIRES_IN',
        refreshTokenExpiresIn: 'REFRESH_TOKEN_EXPIRES_IN',
        refreshTokenExpiresDateStamp: 'REFRESH_TOKEN_EXPIRES_DATE_STAMP',
        accessTokenExpiresDateStamp: 'ACCESS_TOKEN_EXPIRES_DATE_STAMP',
        userData: 'USER_DATA',
        currentBasket: 'CURRENT_BASKET',
        city: 'CITY',
        citiesList: 'CITIES_LIST',
    };

    static minimalUpdateTokenTime = 300 * 1000 // 300 sec;

    static weightUnits = [
        { key: 'gr', type: 'gr', label: 'гр.' },
        { key: 'ml', type: 'ml', label: 'мл.' },
    ];

    static weightUnitsMap = Types.weightUnits.reduce((acc, item) => acc.set(item.key, { ...item }), new Map());

    static updateDeliverySlotsInterval = 120 * 1000 // 120 sec;

    static ordersStatus = [
        { key: 'Unconfirmed', label: 'Ожидает подтверждения…', id: '1' },
        { key: 'WaitCooking', label: 'На кухне', id: '2' },
        { key: 'ReadyForCooking', label: 'На кухне', id: '3' },
        { key: 'CookingStarted', label: 'На кухне', id: '4' },
        { key: 'CookingCompleted', label: 'На кухне', id: '5' },
        { key: 'Waiting', label: 'На кухне', id: '6' },
        { key: 'OnWay', label: 'В пути', id: '7' },
        { key: 'Delivered', label: 'Доставлен', id: '8' },
        { key: 'Closed', label: 'Закрыт', id: '9' },
        { key: 'Cancelled', label: 'Отменён', id: '10' },
        { key: 'Error', label: 'Ошибка создания заказа', id: '11' },
    ];

    static ordersStatusMap = Types.ordersStatus.reduce((acc, item) => acc.set(item.key, { ...item }), new Map());

    static oldFrontCitiesList = [
        { name: 'Абакан', slug: 'abakan', redirect: true },
        { name: 'Альметьевск', slug: 'almetevsk', redirect: true },
        { name: 'Ангарск', slug: 'angarsk', redirect: true },
        { name: 'Артём', slug: 'artyom', redirect: true },
        { name: 'Ачинск', slug: 'achinsk', redirect: true },
        { name: 'Балашиха', slug: 'balashiha', redirect: true },
        { name: 'Балтийск', slug: 'baltijsk', redirect: true },
        { name: 'Барнаул', slug: 'barnaul', redirect: true },
        { name: 'Белгород', slug: 'belgorod', redirect: true },
        { name: 'Березники', slug: 'berezniki', redirect: true },
        { name: 'Бийск', slug: 'bijsk', redirect: true },
        { name: 'Благовещенск', slug: 'blagovesh', redirect: true },
        { name: 'Бородино', slug: 'borodino', redirect: true },
        { name: 'Братск', slug: 'bratsk', redirect: true },
        { name: 'Верхняя Пышма', slug: 'verhnyaja-pyshma', redirect: true },
        { name: 'Верхняя Салда', slug: 'verh-salda', redirect: true },
        { name: 'Владивосток', slug: 'vladivostok', redirect: true },
        { name: 'Волгоград', slug: 'volgograd', redirect: true },
        { name: 'Волгодонск', slug: 'volgodonsk', redirect: true },
        { name: 'Вышний Волочек', slug: 'vyshny-volochek', redirect: true },
        { name: 'Дзержинский', slug: 'dzerjinsky', redirect: true },
        { name: 'Екатеринбург', slug: 'ekaterinburg', redirect: true },
        { name: 'Елец', slug: 'elec', redirect: true },
        { name: 'Железногорск', slug: 'jeleznogorsk', redirect: true },
        { name: 'Зеленогорск', slug: 'zelenogorsk', redirect: true },
        { name: 'Иваново', slug: 'ivanovo', redirect: true },
        { name: 'Ижевск', slug: 'izhevsk', redirect: true },
        { name: 'Иркутск', slug: 'irkutsk', redirect: true },
        { name: 'Ишим', slug: 'ishim', redirect: true },
        { name: 'Йошкар-Ола', slug: 'yoshkar-ola', redirect: true },
        { name: 'Казань', slug: 'kazan', redirect: true },
        { name: 'Калининград', slug: 'kaliningrad', redirect: true },
        { name: 'Каменск-Уральский', slug: 'kamensk-uralsky', redirect: true },
        { name: 'Канск', slug: 'kansk', redirect: true },
        { name: 'Киров', slug: 'kirov', redirect: true },
        { name: 'Когалым', slug: 'kogalym', redirect: true },
        { name: 'Королев', slug: 'korolev', redirect: true },
        { name: 'Кострома', slug: 'kostroma', redirect: true },
        { name: 'Котельники', slug: 'kotelniki', redirect: true },
        { name: 'Краснодар', slug: 'krasnodar', redirect: true },
        { name: 'Красноярск', slug: 'krasnoyarsk', redirect: true },
        { name: 'Кстово', slug: 'kstovo', redirect: true },
        { name: 'Курган', slug: 'kurgan', redirect: true },
        { name: 'Лабытнанги', slug: 'labytnangi', redirect: true },
        { name: 'Липецк', slug: 'lipeck', redirect: true },
        { name: 'Люберцы', slug: 'lyberci', redirect: true },
        { name: 'Лянтор', slug: 'lyantor', redirect: true },
        { name: 'Магадан', slug: 'magadan', redirect: true },
        { name: 'Мегион', slug: 'megion', redirect: true },
        { name: 'Междуреченск', slug: 'mezhdurechensk', redirect: true },
        { name: 'Миасс', slug: 'mias', redirect: true },
        { name: 'Минусинск', slug: 'minusinsk', redirect: true },
        { name: 'Москва', slug: 'moscow', redirect: true },
        { name: 'Мурманск', slug: 'murmansk', redirect: true },
        { name: 'Мытищи', slug: 'mitishi', redirect: true },
        { name: 'Нефтекамск', slug: 'neftekamsk', redirect: true },
        { name: 'Нижневартовск', slug: 'nizhnevartovsk', redirect: true },
        { name: 'Нижнекамск', slug: 'nijnekamsk', redirect: true },
        { name: 'Нижний Новгород', slug: 'nino', redirect: true },
        { name: 'Нижний Тагил', slug: 'nijny-tagil', redirect: true },
        { name: 'Новокузнецк', slug: 'novokuzneck', redirect: true },
        { name: 'Новосибирск', slug: 'novosibirsk', redirect: true },
        { name: 'Новый Уренгой', slug: 'noviy-urengoy', redirect: true },
        { name: 'Нягань', slug: 'nyagan', redirect: true },
        { name: 'Омск', slug: 'omsk', redirect: true },
        { name: 'Оренбург', slug: 'orenburg', redirect: true },
        { name: 'Петрозаводск', slug: 'petrozavodsk', redirect: true },
        { name: 'Петропавловск-Камчатский', slug: 'petropavlovsk-kamchatskiy', redirect: true },
        { name: 'Подольск', slug: 'podolsk', redirect: true },
        { name: 'Прокопьевск', slug: 'prokopievsk', redirect: true },
        { name: 'Псков', slug: 'pskov', redirect: true },
        { name: 'Пыть-Ях', slug: 'pyt-yah', redirect: true },
        { name: 'Ростов на Дону', slug: 'rostov-na-donu', redirect: true },
        { name: 'Рыбинск', slug: 'rybinsk', redirect: true },
        { name: 'Рязань', slug: 'ryazan', redirect: true },
        { name: 'Самара', slug: 'samara', redirect: true },
        { name: 'Санкт-Петербург', slug: 'spb', redirect: true },
        { name: 'Саранск', slug: 'saransk', redirect: true },
        { name: 'Севастополь', slug: 'sevastopol', redirect: true },
        { name: 'Симферополь', slug: 'simpheropol', redirect: true },
        { name: 'Сочи', slug: 'sochi', redirect: true },
        { name: 'Ставрополь', slug: 'stavropol', redirect: true },
        { name: 'Стерлитамак', slug: 'sterlitamak', redirect: true },
        { name: 'Сургут', slug: 'surgut', redirect: true },
        { name: 'Сыктывкар', slug: 'syktyvkar', redirect: true },
        { name: 'Тамбов', slug: 'tambov', redirect: true },
        { name: 'Тверь', slug: 'tver', redirect: true },
        { name: 'Тобольск', slug: 'tobolsk', redirect: true },
        { name: 'Тольятти', slug: 'tolyatti', redirect: true },
        { name: 'Томск', slug: 'tomsk', redirect: true },
        { name: 'Тутаев', slug: 'tutaev', redirect: true },
        { name: 'Тюмень', slug: 'tumen', redirect: true },
        { name: 'Улан-Удэ', slug: 'ulanude', redirect: true },
        { name: 'Урай', slug: 'uraj', redirect: true },
        { name: 'Усть-Илимск', slug: 'ust-ilimsk', redirect: true },
        { name: 'Уфа', slug: 'ufa', redirect: true },
        { name: 'Ухта', slug: 'ukhta', redirect: true },
        { name: 'Хабаровск', slug: 'khabarovsk', redirect: true },
        { name: 'Химки', slug: 'himki', redirect: true },
        { name: 'Чебоксары', slug: 'cheboksari', redirect: true },
        { name: 'Челябинск', slug: 'chelyabinsk', redirect: true },
        { name: 'Череповец', slug: 'cherepovec', redirect: true },
        { name: 'Чехов', slug: 'chehov', redirect: true },
        { name: 'Чита', slug: 'chita', redirect: true },
        { name: 'Чусовой', slug: 'chusovoy', redirect: true },
        { name: 'Электросталь', slug: 'electrostall', redirect: true },
        { name: 'Югорск', slug: 'jugorsk', redirect: true },
        { name: 'Южно-Сахалинск', slug: 'iujno-sakhalinsk', redirect: true },
        { name: 'Ялуторовск', slug: 'yalturovsk', redirect: true },
        { name: 'Ярославль', slug: 'yaroslavl', redirect: true },
    ];

    static oldFrontCitiesListMap = Types.oldFrontCitiesList.reduce((acc, item) => acc.set(item.slug, { ...item }), new Map());

    static imageSize = [
        { size: '109x80', key: 'basketWidgetMobile' },
        { size: '109x80', key: 'basketWidgetTablet' },
        { size: '78x58', key: 'basketWidgetDesktop' },
        { size: '109x80', key: 'basketWidgetLarge' },

        { size: '124x92', key: 'productMobile' },
        { size: '212x157', key: 'productTablet' },
        { size: '265x194', key: 'productDesktop' },
        { size: '325x240', key: 'productLarge' },

        { size: '296x217', key: 'productModalMobile' },
        { size: '428x314', key: 'productModalTablet' },
        { size: '390x288', key: 'productModalDesktop' },
        { size: '428x314', key: 'productModalLarge' },

        { size: '74x54', key: 'basketMobile' },
        { size: '120x88', key: 'basketTablet' },
        { size: '110x81', key: 'basketDesktop' },
        { size: '120x88', key: 'basketLarge' },
    ];

    static imageSizeMap = Types.imageSize.reduce((acc, item) => acc.set(item.key, { ...item }), new Map());
}
