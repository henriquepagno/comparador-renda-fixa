import React, { ReactElement } from 'react';

import { ToastMessage } from '../../hookStore/Toast';

import Toast from './Toast';

import styles from './ToastContainer.module.scss';

interface IToastContainerProps {
  messages: ToastMessage[];
}

export default function ToastContainer({
  messages,
}: IToastContainerProps): ReactElement {
  return (
    <div className={styles['container']}>
      {messages.map(({ id, title, description, type }) => {
        const item = { id, title, description, type };

        return <Toast key={id} message={item} />;
      })}
    </div>
  );
}
