import React from 'react';
import PageNavigation from '../page-navigation';
import aboutCompany1 from '../../assets/images/about-company1.png';
import aboutCompany2 from '../../assets/images/about-img-2.png';

import './about-company-content.scss';

const AboutCompanyContent = () => {
    const renderLarge = () => (
        <div className="AboutCompanyContent__wrapper">

            <div className="AboutCompanyContent__wrapper__left-zone">
                <div className="text-wrapper">

                    <p>
                        {'Выбирая название для службы доставки, мы постарались выделиться и запомниться\n'
                        + 'Вам раз и навсегда. Иначе говоря – запасть в душу ещё до того,\n'
                        + 'как наши вкуснейшие суши и роллы попадут в ваш желудок.'}
                    </p>
                    <br />
                    <p>
                        {'Это был долгий путь: сотни исписанных страниц,\n'
                        + 'десятки часов ожесточённых споров… И на стыках двух величайших\n'
                        + 'языков появилось название – «ЁбиДоёби» [曜土曜日| Ё:би доё:би] ,\n'
                        + 'что в переводе с японского означает «День недели – суббота».'}
                    </p>
                    <br />
                    <p>
                        {'Так пусть каждый день будет такой же энергичный и весёлый,\n'
                        + 'как суббота! А символичное название вызывает улыбку у вас –\n'
                        + 'молодых и активных любителей суши с отличным чувством юмора.'}
                    </p>
                    <br />
                    <p>
                        Почта для сотрудничества:
                        <br />
                        <span style={{ color: 'red' }}>coordinator@yobidoyobi.com</span>
                    </p>
                </div>

                <div className="image-wrapper">
                    <img className="image" src={aboutCompany2} alt="AbComp" />
                </div>
            </div>

            <div className="AboutCompanyContent__wrapper__right-zone">
                <div className="image-wrapper">
                    <img className="image" src={aboutCompany1} alt="AbComp" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="AboutCompanyContent container">
            <PageNavigation namePage="О компании" />
            <div className="AboutCompanyContent__name">
                О компании
            </div>
            { renderLarge() }
        </div>

    );
};

export default AboutCompanyContent;
