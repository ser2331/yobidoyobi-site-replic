import React from 'react';
import { ReactSVG } from 'react-svg';
import Types from '../../classes/types';
import PageNavigation from '../page-navigation';
import docIcon from '../../assets/images/doc-icon.svg';

import './legal-documents-content.scss';

const { legalDocuments } = Types;

const LegalDocumentsContent = () => (
    <div className="LegalDocumentsContent">
        <div className="LegalDocumentsContent__nav container disPadding">
            <PageNavigation namePage="Правовые документы" />
        </div>

        <div className="LegalDocumentsContent__name">
            Правовые документы
        </div>

        <div className="LegalDocumentsContent__documents-cart">
            <div className="documents-wrapper">
                { legalDocuments.map(({
                    key, name, link,
                }) => (
                    <div key={key} className="document">
                        <ReactSVG src={docIcon} />
                        <a href={link} target="_blank" rel="noreferrer">{name}</a>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default LegalDocumentsContent;
