import { CircularProgress } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './LoadingIndicator.css';

interface ILoadingIndicator {
    visible: boolean
}

const LoadingIndicator: FC<ILoadingIndicator> = ({ visible }) => {
  const { t } = useTranslation()

  if (visible) {
    return (
      <div className={styles.newCarLoader}>
        <CircularProgress />
      </div>
    )
  }
  return <></>
}

export default LoadingIndicator
