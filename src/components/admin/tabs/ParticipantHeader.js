import React from "react";
import { Column, Center, BodySmallBoldText, CaptionText } from "../../../common/styles";
import { Row } from "../style";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";



const ParticipantHeader = ({participant}) => {

    const {t} = useTranslation();


    return (
        <Row width="633px">
            <Center><BodySmallBoldText>{participant.participant_name}</BodySmallBoldText></Center>
            <Column>
                <CaptionText>{t('admin.registration_type')}</CaptionText>
                <BodySmallBoldText>
                    {t(`admin.${participant.registration_type}`)}
                </BodySmallBoldText>
            </Column>
            <Column>
                <CaptionText>{t('admin.location')}</CaptionText>
                <BodySmallBoldText>{participant.location}</BodySmallBoldText>
            </Column>
            <Center><BodySmallBoldText>{t('admin.details')}</BodySmallBoldText></Center>
        </Row>);

}

ParticipantHeader.propTypes = {
    participant: PropTypes.object
}

export default ParticipantHeader;