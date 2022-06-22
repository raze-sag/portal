import React from "react";
import { BodySmallText, CaptionTeleNeoText, Column, Style, Tag, WrapRow } from "../../../common/styles";
import LoadingView from "../../loading_view/LoadingView";
import PropTypes from 'prop-types';
import { CaptionText, DetailsContainer, ElementGroup } from "../style";
import { useTranslation } from "react-i18next";

const KeyValueDetails = ({id, url_prefix}) => {

// TODO: change to right API call
const URL = `${url_prefix}/${id}/details`;

const fakeData = {items: [{name: 'First name', value: 'First Name Value'},{name: 'Last name', value: 'Last name Value'},{name: 'Email', value: 'email@domain.com'},{name: 'Phone number', value: '+49 123 456 789'}, {name: 'Address', value: 'August-Bebel-Str. 46 39326 Colbitz Germany'}],
                  attachments: [{name: 'atachment 1', url: 'https://www.bmwk.de/Redaktion/EN/Publikationen/gaia-x-technical-architecture.html', alt: 'Gaia-x technical architecture'}, {name: 'atachment 2', url: 'https://www.bmwk.de/Redaktion/EN/Publikationen/gaia-x-technical-architecture.html', alt: 'Gaia-x Technical architecture 2'}, {name: 'atachment 2', url: 'https://www.bmwk.de/Redaktion/EN/Publikationen/gaia-x-technical-architecture.html', alt: 'Gaia-x Technical architecture 2'}, {name: 'atachment 2', url: 'https://www.bmwk.de/Redaktion/EN/Publikationen/gaia-x-technical-architecture.html', alt: 'Gaia-x Technical architecture 2'}, {name: 'atachment 2', url: 'https://www.bmwk.de/Redaktion/EN/Publikationen/gaia-x-technical-architecture.html', alt: 'Gaia-x Technical architecture 2'}, {name: 'atachment 2', url: 'https://www.bmwk.de/Redaktion/EN/Publikationen/gaia-x-technical-architecture.html', alt: 'Gaia-x Technical architecture 2'}]};

    const {t} = useTranslation();

    const showItemElements = (items) => {
        return (items.map((item, i) => {return( 
            <ElementGroup key={i}>
                <CaptionTeleNeoText>{item.name}</CaptionTeleNeoText>
                <BodySmallText>{item.value}</BodySmallText>
            </ElementGroup>)}));
    }

    const showAttachments = (attachments) => {
        if (!attachments) return null;
        return (
            <ElementGroup>
                <CaptionText>{t('admin.attachments')}</CaptionText>
                <WrapRow>
                        {attachments.map((attachment, i) => {return( <Style marginTop='8px' key={i}><Tag>{attachment.name}</Tag></Style>
                        )})}
                </WrapRow>
             </ElementGroup>
        );
    }

    const successView = ({data}) => {
        const person = fakeData;
        if (!person) return null;
        return (
                <DetailsContainer>
                <Column>
                    {showItemElements(person.items)}
                    {showAttachments(person?.attachments)}
                </Column>
                </DetailsContainer>
        );

    }

    return (
        <LoadingView url={URL} successView={successView}/>);

}

KeyValueDetails.propTypes = {
    id: PropTypes.string,
    url_prefix: PropTypes.string
}

export default KeyValueDetails;