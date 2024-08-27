import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ShapeContext } from '../../../../context/ShapeContext';
import { getShapeByName } from '../../../../services/shapeService.utils';
import Title from '../../../Title/Title';

import styles from './ShapeMainContent.module.css';

const ShapeMainContent: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const shape = useContext(ShapeContext);

  if (!shape) {
    return <div>{t('shapes.not-found')}</div>;
  }

  const handleNavigationToDetailsPage = async (shapeName: string) => {
    const shapeToLink = await getShapeByName(shapeName);
    if (shapeToLink) {
      navigate(`/shapes/details/${shapeToLink.subject}`);
    }
  }

  const uniqueTypes = Array.from(new Set(
    shape.properties.flatMap(property => property.propertyValues.map(value => value.type))
  ));

  return (
    <div className={styles['container']}>
      <Title>{shape.subject}</Title>

      <table className={styles['table']}>
        <thead>
          <tr>
            {uniqueTypes.map((type, index) => (
              <th key={index}>{type.split('#').pop()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shape.properties.map((property, index) => (
            <tr key={index}>
              {uniqueTypes.map((type, index) => {
                const value = property.propertyValues.find(value => value.type === type);
                if (value && value.value && type === 'http://www.w3.org/ns/shacl#node') {
                  return <td key={index} className={styles['link']} onClick={() => handleNavigationToDetailsPage(value.value)}>{value ? value.value : ''}</td>;
                } else {
                  return <td key={index}>{value ? value.value : ''}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ShapeMainContent;
