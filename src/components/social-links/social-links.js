import React from 'react';
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';
import * as _ from 'lodash';
import vkIcon from '../../assets/images/social/vk.svg';
import instagramIcon from '../../assets/images/social/instagram.svg';
import flampIcon from '../../assets/images/social/flamp.svg';
import tikTokIcon from '../../assets/images/social/tik-tok.svg';
import telegramIcon from '../../assets/images/social/telegram.svg';

import './social-links.scss';

const SocialLinks = () => {
    const city = useSelector((state) => _.get(state, 'app.city'));

    const socialSet = [
        {
            id: 'vk',
            icon: vkIcon,
            link: city.url_vk,
        },
        {
            id: 'instagram',
            icon: instagramIcon,
            link: city.url_instagram,
        },
        {
            id: 'flamp',
            icon: flampIcon,
            link: city.url_flamp,
        },
        {
            id: 'tikTok',
            icon: tikTokIcon,
            link: city.url_tiktok,
        },
        {
            id: 'telegram',
            icon: telegramIcon,
            link: city.url_telegram,
        },
    ];

    const renderSocial = ({ id, icon, link }) => (
        <a
            className="SocialLinks__item-wrapper"
            key={id}
            href={link}
            target="blank"
        >
            <ReactSVG src={icon} className="SocialLinks__item" />
        </a>
    );

    return (
        <div className="SocialLinks">
            {socialSet.filter((item) => item.link).map(renderSocial)}
        </div>
    );
};

export default SocialLinks;
