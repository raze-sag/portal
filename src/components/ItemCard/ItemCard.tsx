import HubIcon from '@mui/icons-material/Hub';
import InterestsIcon from '@mui/icons-material/Interests';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import StorageIcon from '@mui/icons-material/Storage';
import VerifiedIcon from '@mui/icons-material/Verified';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Ontology } from 'types/ontologies.model';
import { Resource } from 'types/resources.model';
import { ServiceOffering } from 'types/serviceOfferings.model';
import { Shape } from 'types/shapes.model';

import Title from '../Title/Title';

import styles from './ItemCard.module.css';
import OntologyCardContent from './OntologyCardContent';
import ParticipantCardContent from './ParticipantCardContent';
import ResourceCardContent from './ResourceCardContent';
import ServiceCardContent from './ServiceCardContent';
import ShapeCardContent from './ShapeCardContent';

interface IItemCard {
  label: string;
  isGaiaXCompliant?: boolean;
  ontology?: Ontology;
  shape?: Shape;
  service?: ServiceOffering;
  resource?: Resource;
}

const ItemCard: FC<IItemCard> = ({
  label,
  isGaiaXCompliant,
  ontology,
  shape,
  service,
  resource,
}) => {
  const { t } = useTranslation();

  const getIcon = () => {
    if (service) {
      return (
        <>
          <SettingsSuggestIcon style={{ fontSize: 66, color: 'white' }} />
        </>
      );
    } else if (resource) {
      return (
        <>
          <StorageIcon style={{ fontSize: 66, color: 'white' }} />
        </>
      );
    } else if (ontology) {
      return <HubIcon style={{ fontSize: 66, color: 'white' }} />;
    } else if (shape) {
      return <InterestsIcon style={{ fontSize: 66, color: 'white' }} />;
    } else {
      return <QuestionMarkIcon style={{ fontSize: 66, color: 'white' }} />;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.label}>
        {getIcon()}
        <Title>{label}</Title>
        {isGaiaXCompliant === undefined ? null : isGaiaXCompliant ? (
          <p>
            {t('common.is-gaia-x-compliant')}
            {' '}
            <VerifiedIcon
              style={{ fontSize: 22, color: 'white', marginLeft: '2px' }}
            />
          </p>
        ) : (
          <p>{t('common.not-gaia-x-compliant')}</p>
        )}
      </div>
      <div className={styles.content}>
        {ontology ? (
          <OntologyCardContent ontology={ontology} />
        ) : shape ? (
          <ShapeCardContent shape={shape} />
        ) : service ? (
          <ServiceCardContent service={service} />
        ) : resource ? (
          <ResourceCardContent resource={resource} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
