import GaiaXButton from 'components/buttons/GaiaXButton';
import { useTranslation } from 'react-i18next';
import { BiShapePolygon } from 'react-icons/bi';
import { FaDatabase } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import {
  MdMiscellaneousServices,
  MdOutlineQuestionMark,
  MdVerified,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ServiceOffering, Resource, Ontology } from 'utils/dataMapper';

import styles from './SelfDescriptionCard.module.css';

export interface ServiceOfferingCardData {
  name?: string;
  providedBy: string;
  type: RessourceType.ServiceOffering;
}

export interface LegalParticipantCardData {
  legalName: string;
  countryCode: string;
  subdivisionCountrCode: string;
  leiCode: string;
  type: RessourceType.LegalParticipant;
}

export interface DataResourceCardData {
  containsPII: boolean;
  copyrightOwnedBy: string;
  description: string;
  license: string;
  name: string;
  policy: string;
  type: RessourceType.DataResource;
}

export interface OntologyCardData {
  subject: string;
  title: string;
  description: string;
  type: RessourceType.Ontology;
}

export interface GenericData {
  description: string;
  name: string;
  type: RessourceType.GenericData;
}

export enum RessourceType {
  ServiceOffering = 'ServiceOffering',
  LegalParticipant = 'LegalParticipant',
  DataResource = 'DataResource',
  Ontology = 'Ontology',
  GenericData = 'GenericData',
}

interface ISelfDescriptionCard {
  isGaiaXCompliant?: boolean;
  selfDescription: ServiceOffering | Resource | Ontology;
  data:
    | ServiceOfferingCardData
    | LegalParticipantCardData
    | OntologyCardData
    | DataResourceCardData
    | GenericData;
}

export default function SelfDescriptionCard({
  isGaiaXCompliant,
  selfDescription,
  data,
}: Readonly<ISelfDescriptionCard>) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigationToDetailsPage = () => {
    // Check if claimsGraphUri is an array and has at least one entry
    if (
      Array.isArray(selfDescription.claimsGraphUri) &&
      selfDescription.claimsGraphUri.length > 0
    ) {
      // Extract the first URI from the array
      const firstUri = selfDescription.claimsGraphUri[0];
      // Encode the URI component to ensure special characters are URL-safe
      const encodedUri = encodeURIComponent(firstUri);
      // Navigate to the details page with the encoded URI
      navigate(`/details/${encodedUri}`);
    } else {
      // Handle the case where claimsGraphUri is not available or not in expected format
      console.error('Invalid claimsGraphUri:', selfDescription.claimsGraphUri);
      // You might want to show a user-friendly message or navigate to an error page
    }
  };
  const isLegalParticipant = data.type === RessourceType.LegalParticipant;
  const isServiceOffering = data.type === RessourceType.ServiceOffering;
  const isDataResource = data.type === RessourceType.DataResource;
  const isOntology = data.type === RessourceType.Ontology;

  const getIcon = () => {
    if (isLegalParticipant) {
      return (
        <>
          <IoMdPerson size={70} color='white' className={styles.labelIcon} />
          <p>LegalParticipant</p>
        </>
      );
    } else if (isServiceOffering) {
      return (
        <>
          <MdMiscellaneousServices
            size={70}
            color='white'
            className={styles.labelIcon}
          />
          <p>ServiceOffering</p>
        </>
      );
    } else if (isDataResource) {
      return (
        <>
          <FaDatabase size={70} color='white' className={styles.labelIcon} />
          <p>DataResource</p>
        </>
      );
    } else if (isOntology) {
      return (
        <BiShapePolygon size={70} color='white' className={styles.labelIcon} />
      );
    } else {
      return (
        <MdOutlineQuestionMark
          size={70}
          color='white'
          className={styles.labelIcon}
        />
      );
    }
  };

  const getComplianceText = () => {
    if (isGaiaXCompliant === undefined) {
      return null;
    }
    if (isGaiaXCompliant) {
      return (
        <p className={styles.verifiedText}>
          {t('resources.is-gaia-x-compliant')}
          <MdVerified size={24} className={styles.verifiedIcon} />
        </p>
      );
    } else {
      return <p>{t('resources.not-gaia-x-compliant')}</p>;
    }
  };

  const getContent = () => {
    if (isLegalParticipant) {
      return (
        <>
          <p className={styles.heading}>
            {data.legalName} ({data.subdivisionCountrCode})
          </p>
          <p className={styles.subheading}>{data.leiCode}</p>
        </>
      );
    } else if (isServiceOffering) {
      return (
        <>
          <p className={styles.heading}>{data.name ? data.name : 'No name available!'}</p>
          <p className={styles.subheading}>
            <IoMdPerson size={16}  className={styles.labelIcon} />
            {data.providedBy}
          </p>
        </>
      );
    } else if (isDataResource) {
      return (
        <>
          <p className={styles.heading}>
            {data.name} ({data.license})
          </p>
          <p className={styles.subheading}>{data.description}</p>
        </>
      );
    } else if (isOntology) {
      return (
        <>
          <p className={styles.heading}>{data.title}</p>
          <p className={styles.subheading}>{data.description}</p>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.label}>
        {getIcon()}
        {getComplianceText()}
      </div>
      <div className={styles.content}>
        {getContent()}
        <div className={styles.button}>
          <GaiaXButton
            label={t('details.moreDetails')}
            handleOnClick={handleNavigationToDetailsPage}
          />
        </div>
      </div>
    </div>
  );
}
