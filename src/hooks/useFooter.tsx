import { useTranslation } from 'react-i18next';

export const useFooter = () => {
  const { t } = useTranslation();

  return [
    {
      path: 'https://www.softwareag.com/en_corporate/privacy.html',
      navigationItemName: t('links.privacy'),
    },
    {
      path: 'https://www.softwareag.com/en_corporate/impressum.html',
      navigationItemName: t('links.imprint'),
    },
  ];
};
