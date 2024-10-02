import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Participant } from 'types/participants.model';

import Title from '../Title/Title';
import GaiaXButton from '../buttons/GaiaXButton';

import styles from './ItemCard.module.css';

interface IParticipantCardContent {
  participant: Participant;
}

const ParticipantCardContent: FC<IParticipantCardContent> = ({
  participant,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigationToDetailsPage = () => {
    navigate(`/shapes/details/${participant.claimsGraphUri}`);
  };

  return (
    <div className={styles.content}>
      <div style={{ textAlign: 'left' }}>
        <Title>
          {participant.legalName || t('participants.no-title')} (
          {participant.countrySubdivisionCode || ''})
        </Title>
      </div>
      <p>
        {participant.registrationNumber || t('participants.no-description')}
      </p>

      <div className={styles.button}>
        <GaiaXButton
          label={t('details.more-details')}
          handleOnClick={handleNavigationToDetailsPage}
        />
      </div>
    </div>
  );
};

export default ParticipantCardContent;
