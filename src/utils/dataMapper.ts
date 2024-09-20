// This Interface is termporary, due to how we recieve data at the moment.

import {
  ServiceOfferingCardData,
  LegalParticipantCardData,
  RessourceType,
  DataResourceCardData,
} from 'components/cards/SelfDescriptionCard';

// Interfaces and Mappers for Service Offerings
export interface ServiceOfferingInput {
  items: Array<{
    'labels(n)': {
      0: string;
      1: string;
    };
    'properties(n)': {
      name: string;
      policy: string;
      uri: string;
      description: string;
      claimsGraphUri: string;
    };
  }>;
}

export interface ServiceOffering {
  label: string;
  name: string;
  policy: string;
  uri: string;
  description: string;
  claimsGraphUri: string;
}

export function mapServiceOfferings(
  selfDescriptions: ServiceOfferingInput
): ServiceOffering[] {
  console.debug('From mapper: ', selfDescriptions);
  return selfDescriptions.items.map(
    ({ 'properties(n)': p, 'labels(n)': l }) => ({
      label: l[1],
      name: p.name,
      policy: p.policy,
      uri: p.uri,
      description: p.description,
      claimsGraphUri: p.claimsGraphUri,
    })
  );
}

// Interfaces and Mappers for Resources
export interface ResourceInput {
  items: Array<{
    'labels(n)': {
      0: string;
      1: string;
    };
    'properties(n)': {
      name: string;
      description: string;
      uri: string;
      claimsGraphUri: string;
    };
    relatedNode: {
      name: string;
      description: string;
      uri: string;
      claimsGraphUri: string;
    };
    providedByLegalParticipant: {
      legalName: string;
    };
  }>;
}

export interface Resource {
  type: string;
  data:
    | ServiceOfferingCardData
    | LegalParticipantCardData
    | DataResourceCardData;
  uri: string;
  claimsGraphUri: string;
}

export function mapResources(selfDescriptions: ResourceInput): Resource[] {
  console.debug('From mapper: ', selfDescriptions);

  return selfDescriptions.items.map(
    ({
      'properties(n)': p,
      'labels(n)': l,
      relatedNode: r,
      providedByLegalParticipant: m,
    }) => {
      let data;

      switch (l[1]) {
      case RessourceType.ServiceOffering:
        data = mapServiceOfferingData(p, m);
        break;
      case RessourceType.LegalParticipant:
        data = mapLegalParticipantData(p, r);
        break;
      case RessourceType.DataResource:
        data = mapDataResourceData(p);
        break;
      default:
        throw new Error(`Unknown resource type: ${l[1]}`);
      }

      return {
        type: l[1],
        data: data,
        uri: p.uri,
        claimsGraphUri: p.claimsGraphUri,
      };
    }
  );
}

function mapServiceOfferingData(p: any, m: any): ServiceOfferingCardData {
  const data: ServiceOfferingCardData = {
    providedBy: m.legalName,
    type: RessourceType.ServiceOffering,
  };
  if (p.name) {
    data.name = p.name;
  }
  return data;
}

function mapLegalParticipantData(p: any, r: any): LegalParticipantCardData {
  const data: LegalParticipantCardData = {
    legalName: p.legalName,
    countryCode: r['leiCode-countryCode'] ,
    subdivisionCountrCode: r['leiCode-subdivisionCountryCode'],
    leiCode: r.leiCode ,
    vatId: r.vatID,
    type: RessourceType.LegalParticipant,
  };
  return data;
}

function mapDataResourceData(p: any): DataResourceCardData {
  const data: DataResourceCardData = {
    containsPII: p.containsPII as boolean,
    copyrightOwnedBy: p.copyrightOwnedBy,
    description: p.description,
    license: p.license,
    name: p.name,
    policy: p.policy,
    type: RessourceType.DataResource,
  };
  return data;
}
