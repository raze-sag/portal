// This Interface is termporary, due to how we recieve data at the moment.

// Interfaces and Mappers for Service Offerings
import { Participant } from 'types/participants.model';
import { Resource } from 'types/resources.model';
import { ServiceOffering } from 'types/serviceOfferings.model';

// TODO: Refactor. See ResourceInput.
export interface ServiceOfferingInput {
  items: Array<{
    'labels(n)': {
      0: string,
      1: string
    },
    'properties(n)': {
      name: string,
      policy: string,
      uri: string,
      description: string,
      claimsGraphUri: string,
    };
  }>;
}

// TODO: Refactor. See mapResources(...).
export function mapServiceOfferings(selfDescriptions: any): ServiceOffering[] {
  console.debug('From mapper: ', selfDescriptions);
  return selfDescriptions.items.map((item) => (mapServiceOffering(item)));
}

export function mapServiceOffering(serviceOffering: any): ServiceOffering {
  console.debug('From mapper: ', serviceOffering);
  const serviceOfferingToParse = serviceOffering.so ? serviceOffering.so : serviceOffering

  return {
    label: serviceOfferingToParse.name ? serviceOfferingToParse.name : null,
    name: serviceOfferingToParse.name ? serviceOfferingToParse.name : null,
    policy: serviceOfferingToParse.policy
      ? serviceOfferingToParse.policy
      : null,
    uri: serviceOfferingToParse.uri ? serviceOfferingToParse.uri : null,
    description: serviceOfferingToParse.description
      ? serviceOfferingToParse.description
      : null,
    claimsGraphUri: serviceOfferingToParse.claimsGraphUri
      ? serviceOfferingToParse.claimsGraphUri
      : null,
    labels: serviceOffering.labels ? serviceOffering.labels : [],
    provider: serviceOffering.lp
      ? mapParticipant(
        serviceOffering.lp,
        serviceOffering.lpAddress,
        serviceOffering.lpRegNumber
      )
      : undefined,
  };
}

export function mapParticipant(
  participant: any,
  participantAddress?: any,
  participanRegistrationNumber?: any
): Participant {
  console.debug(
    'From mapper: ',
    participant,
    participantAddress,
    participanRegistrationNumber
  );
  return {
    legalName: participant.legalName ? participant.legalName : null,
    registrationNumber: participanRegistrationNumber
      ? participanRegistrationNumber.vatID ||
        participanRegistrationNumber.leiCode
      : null,
    claimsGraphUri: participant ? participant.claimsGraphUri : null,
    countrySubdivisionCode: participantAddress
      ? participantAddress.countrySubdivisionCode
      : null,
    labels: participant.labels ? participant.labels : [],
  };
}

type ResourceInputProperties = Exclude<Resource, 'labels'>
export interface ResourceInput {
  items: {
    format: string,
    labels: string[],
    properties: ResourceInputProperties;
  }[];
}

export function mapResources(selfDescriptions: ResourceInput): Resource[] {
  console.debug(selfDescriptions);
  const resources = selfDescriptions.items.map(
    ({
      format,
      properties,
      labels,
      lp,
      lpAddress,
      lpHQ,
      lpRegNumber,
      directLpAddress,
      directLpHQ,
      directLpRegNumber,
    }) => {
      if (labels.includes('ServiceOffering')) {
        return mapServiceOffering({
          ...properties,
          format,
          labels,
          lp,
          lpAddress,
          lpHQ,
          lpRegNumber,
        });
      } else if (labels.includes('LegalParticipant')) {
        return mapParticipant({
          ...properties,
          format,
          labels,
        },
        directLpAddress,
        directLpRegNumber
        );
      } else {
        return {
          ...properties,
          labels,
          format,
        };
      }
    }
  );
  console.debug('resources', resources);
  return resources;
}

export interface ISelfDescription {
  name: string;
  description: string;
  items: Array<{
    'properties(n)': { [key: string]: string | number | string[] };
  }>;
}

