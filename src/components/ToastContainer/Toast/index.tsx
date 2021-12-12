import React, { ReactElement, useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import { IoMdCheckmark, IoMdAlert, IoMdInformation } from 'react-icons/io';
import { IoIosClose } from 'react-icons/io';

import { ToastMessage, useToast } from '../../../hookStore/Toast';

import styles from './Toast.module.scss';

interface IToastProps {
  message: ToastMessage;
}

const icons = {
  info: <IoMdInformation className={styles['icon--info']} size={24} />,
  error: <IoMdAlert className={styles['icon--error']} size={24} />,
  success: <IoMdCheckmark className={styles['icon--success']} size={24} />,
};

export default function Toast({ message }: IToastProps): ReactElement {
  const { removeToast } = useToast();
  const [animateRemove, setAnimateRemove] = useState(false);

  const classes = clsx(
    styles['container'],
    !!message.description && styles['container--descriptionless'],
    animateRemove && styles['container--remove']
  );

  const setRemoval = useCallback(() => {
    setAnimateRemove(true);
    setTimeout(() => {
      removeToast(message.id);
    }, 350);
  }, [message.id, removeToast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRemoval();
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast, setRemoval]);

  return (
    <div className={classes}>
      {icons[message.type || 'info']}

      <div>
        <h2 className={styles['title']}>{message.title}</h2>
        {message.description && (
          <p className={styles['description']}>{message.description}</p>
        )}
      </div>

      <IoIosClose
        size={22}
        className={styles['close-icon']}
        onClick={() => {
          setRemoval();
        }}
      />
    </div>
  );
}
