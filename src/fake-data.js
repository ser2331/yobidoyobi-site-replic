import uniqid from 'uniqid';
// import stock1 from './assets/images/stock.png';
// import stock2 from './assets/images/stock2.png';
import stock3 from './assets/images/stock-mobile.png';

export default class FakeData {
    static citiesList = [
        {
            value: 0, label: 'Петропавловск-Камчатский', deliveryTime: 20, rating: '3.6', top: false,
        },
        {
            value: 1, label: 'Москва', deliveryTime: 15, rating: '2.6', top: true,
        },
        {
            value: 2, label: 'Санкт-Петербург', deliveryTime: 49, rating: '3.1', top: true,
        },
        {
            value: 4, label: 'Новосибирск', deliveryTime: 26, rating: '5.0', top: true,
        },
        {
            value: 3, label: 'Екатеринбург', deliveryTime: 22, rating: '1.1', top: false,
        },
        {
            value: 5, label: 'Казань', deliveryTime: 35, rating: '4.2', top: false,
        },
        {
            value: 6, label: 'Нижний Новгород', deliveryTime: 20, rating: '3.6', top: false,
        },
        {
            value: 7, label: 'Челябинск', deliveryTime: 15, rating: '2.6', top: false,
        },
        {
            value: 8, label: 'Самара', deliveryTime: 49, rating: '3.1', top: false,
        },
        {
            value: 9, label: 'Омск', deliveryTime: 26, rating: '5.0', top: false,
        },
        {
            value: 10, label: 'Ростов-на-Дону', deliveryTime: 22, rating: '1.1', top: false,
        },
        {
            value: 11, label: 'Уфа', deliveryTime: 35, rating: '4.2', top: false,
        },
        {
            value: 12, label: 'Красноярск', deliveryTime: 20, rating: '3.6', top: false,
        },
        {
            value: 13, label: 'Воронеж', deliveryTime: 15, rating: '2.6', top: false,
        },
        {
            value: 14, label: 'Пермь', deliveryTime: 49, rating: '3.1', top: false,
        },
        {
            value: 15, label: 'Волгоград', deliveryTime: 26, rating: '5.0', top: false,
        },
        {
            value: 16, label: 'Саратов', deliveryTime: 22, rating: '1.1', top: true,
        },
        {
            value: 17, label: 'Тольятти', deliveryTime: 35, rating: '4.2', top: false,
        },
        {
            value: 18, label: 'Ульяновск', deliveryTime: 20, rating: '3.6', top: false,
        },
        {
            value: 19, label: 'Хабаровск', deliveryTime: 15, rating: '2.6', top: false,
        },
        {
            value: 20, label: 'Владивосток', deliveryTime: 49, rating: '3.1', top: false,
        },
        {
            value: 21, label: 'Томск', deliveryTime: 26, rating: '5.0', top: false,
        },
        {
            value: 22, label: 'Рязань', deliveryTime: 22, rating: '1.1', top: false,
        },
        {
            value: 23, label: 'Астрахань', deliveryTime: 35, rating: '4.2', top: false,
        },
    ];

    static productGroups = [
        {
            id: 'recommended',
            name: 'Рекомендуем',
            isStar: true,
            items: [
                {
                    id: uniqid(),
                    name: 'Си сяке Си сяке Си сяке Си сяке Си сяке Си сяке Си сяке Си сяке Си сяке Си сяке Си сяке Си сяке Си сяке',
                    weight: 800,
                    oldPrice: 1320,
                    price: 1100,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лосось',
                            isHot: false,
                        },
                        {
                            name: 'Сыр',
                            isHot: false,
                        },
                        {
                            name: 'Угорь',
                            isHot: false,
                        },
                        {
                            name: 'Креветки',
                            isHot: false,
                        },
                        {
                            name: 'Краб',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Авокадо',
                            isHot: true,
                        },
                        {
                            name: 'Овощи',
                            isHot: false,
                        },
                        {
                            name: 'Тунец',
                            isHot: false,
                        },
                        {
                            name: 'Курица',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
            ],
        },
        {
            id: 'lunches',
            name: 'Ланчи',
            isStar: false,
            items: [
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
            ],
        },
        {
            id: 'sauces',
            name: 'Соусы',
            isStar: false,
            items: [
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
            ],
        },
        {
            id: 'premium',
            name: 'Премиум',
            isStar: false,
            items: [
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
            ],
        },
        {
            id: 'hotSalads',
            name: 'Горячие салаты',
            isStar: false,
            items: [
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
            ],
        },
        {
            id: 'drinksAndDesserts',
            name: 'Напитки и десерты',
            isStar: false,
            items: [
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
                {
                    id: uniqid(),
                    name: 'Си сяке',
                    weight: 800,
                    oldPrice: 650,
                    price: 599,
                    foodValues: [
                        {
                            label: 'Энерг. ценность',
                            value: '228 калл',
                        },
                        {
                            label: 'Белки',
                            value: '7 гр.',
                        },
                        {
                            label: 'Жиры',
                            value: '7 гр.',
                        },
                        {
                            label: 'Углеводы',
                            value: '7 гр.',
                        },
                    ],
                    compound: [
                        {
                            name: 'Лава Темпура',
                            isHot: true,
                        },
                        {
                            name: 'Цезарь темпура',
                            isHot: false,
                        },
                        {
                            name: 'Тамаго маки',
                            isHot: false,
                        },
                        {
                            name: 'Каппа маки',
                            isHot: false,
                        },
                        {
                            name: 'Филадельфия с лососем лайт',
                            isHot: false,
                        },
                    ],
                },
            ],
        },
    ]

    static stocksData = [
        {
            id: uniqid(),
            title: 'Скидка на день рождения',
            percent: '15',
            date: '16.10.2021',
            stockImage: stock3,
        },
    ]

    static timeOptions = [
        { value: 'Ближайшее время', key: 'Option1' },
        { value: 'Через 30 мин', key: 'Option2' },
        { value: 'Через 1 час', key: 'Option3' },
        { value: 'Через 1 час 30 мин', key: 'Option4' },
        { value: 'Через 2 часа', key: 'Option5' },
        { value: 'Через 2 часа 30 мин', key: 'Option6' },
    ];

    static paymentOptions = [
        { key: '0', value: 'Оплата наличными курьеру' },
        { key: '1', value: 'Картой курьеру' },
        { key: '2', value: 'Онлайн на сайте' },
    ];

    static addressPickup = [
        { key: 1, value: 'ул. Одесская, дом 41' },
        { key: 2, value: 'ул. Ленина, дом 52' },
        { key: 3, value: 'ул. Дзержинского, дом 6' },
    ];

    static deliveryAddress = [
        { id: uniqid(), address: 'г.Тирасполь ул.Одесская д.8 кв.32' },
        { id: uniqid(), address: 'г.Григориополь ул.Советская д.52 кв.18' },
        { id: uniqid(), address: 'г.Тирасполь ул.Одесская д.8 кв.32' },
        { id: uniqid(), address: 'г.Тирасполь ул.Одесская д.8 кв.32' },
        { id: uniqid(), address: 'г.Тирасполь ул.Одесская д.8 кв.32' },
    ];

    static historyDelivery = [
        {
            id: uniqid(),
            deliveryNumber: '6165',
            composition: [
                { key: uniqid(), title: 'сисякэerge ', number: '1' },
                { key: uniqid(), title: 'три сисякэ', number: '2' },
                { key: uniqid(), title: 'пол сисяке цезаря', number: '4' },
                { key: uniqid(), title: 'роллы цезаря', number: '7' },
            ],
            address: 'г.Тирасполь ул.Одесская д.8 кв.32',
            waitingTime: '1 час 30 мин',
            processingTime: '13:30',
            status: false,
        },
        {
            id: uniqid(),
            deliveryNumber: '6165',
            composition: [
                { key: uniqid(), title: 'три цезаря', number: '12' },
                { key: uniqid(), title: 'три сjlkljисякэ', number: '2' },
                { key: uniqid(), title: 'пол сисяке цезаря', number: '4' },
                { key: uniqid(), title: 'роллы цезаря', number: '7' },
            ],
            address: 'г.Тирасполь ул.Одесская д.8 кв.32',
            waitingTime: '1 час 30 мин',
            processingTime: '13:30',
            status: true,
        },
        {
            id: uniqid(),
            deliveryNumber: '12',
            composition: [
                { key: uniqid(), title: 'три цезаря', number: '12' },
                { key: uniqid(), title: 'три сиjkljсякэ', number: '2' },
                { key: uniqid(), title: 'пол сисяке цезаря', number: '4' },
                { key: uniqid(), title: 'роллы цезаря', number: '7' },
            ],
            address: 'г.Тирасполь ул.Одесская д.8 кв.32',
            waitingTime: '1 час 30 мин',
            processingTime: '13:30',
            status: false,
        },
        {
            id: uniqid(),
            deliveryNumber: '6165',
            composition: [
                { key: uniqid(), title: 'три цезаря', number: '12' },
                { key: uniqid(), title: 'три сиljkljkсякэ', number: '2' },
                { key: uniqid(), title: 'пол сисяке цезаря', number: '4' },
                { key: uniqid(), title: 'роллы цезаря', number: '7' },
            ],
            address: 'г.Тирасполь ул.Одесская д.8 кв.32',
            waitingTime: '1 час 30 мин',
            processingTime: '13:30',
            status: true,
        },
        {
            id: uniqid(),
            deliveryNumber: '6165',
            composition: [
                { key: uniqid(), title: 'три цезаря', number: '12' },
                { key: uniqid(), title: 'три сисякэ', number: '2' },
                { key: uniqid(), title: 'пол сисяке цезаря', number: '4' },
                { key: uniqid(), title: 'роллы цезаря', number: '7' },
            ],
            address: 'г.Тирасполь ул.Одесская д.8 кв.32',
            waitingTime: '1 час 30 мин',
            processingTime: '13:30',
            status: false,
        },
        {
            id: uniqid(),
            deliveryNumber: '6165',
            composition: [
                { key: uniqid(), title: 'три цезаря', number: '12' },
                { key: uniqid(), title: 'три сисякэ', number: '2' },
                { key: uniqid(), title: 'пол сисяке цезаря', number: '4' },
                { key: uniqid(), title: 'роллы цезаря', number: '7' },
            ],
            address: 'г.Тирасполь ул.Одесская д.8 кв.32',
            waitingTime: '1 час 30 мин',
            processingTime: '13:30',
            status: false,
        },
    ];

    static ProductCardData = {
        productFakePrice: { weight: '1265', oldPrice: '1255', price: '6456' },
        name: 'Название блюда',
        dishComposition: [
            { id: 1, title: 'Текст 1' },
            { id: 2, title: 'Текст 2' },
            { id: 3, title: 'Текст 3' },
            { id: 4, title: 'Текст 4' },
            { id: 5, title: 'Текст 5' },
            { id: 6, title: 'Текст 6' },
        ],
        nutritionalValue: 'Энерг. ценность: 228 ккал, белки: 7 г, жиры: 9 г, углеводы: 31 г',
    };
}
