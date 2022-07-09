import React, { ReactElement, useRef, ReactNode } from 'react';

import useVisibleHandler from '../../hooks/useVisibleHandler';
import { useConfig } from '../../hookStore/Config';

import styles from './Modal.module.scss';

interface IModalProps {
  visible: boolean;
  // eslint-disable-next-line no-unused-vars
  setVisible(visible: boolean): void;
  children: ReactNode;
  closeOnClickOutside?: boolean;
}

export default function Modal({
  visible,
  setVisible,
  children,
  closeOnClickOutside = false,
}: IModalProps): ReactElement {
  const modalRef = useRef<any>();
  const { getClassWithTheme } = useConfig();

  const modalContent = getClassWithTheme(
    styles['modal-content'],
    styles['modal-content--light']
  );

  useVisibleHandler(
    modalRef,
    () => {
      if (visible) {
        setVisible(false);
      }
    },
    true,
    closeOnClickOutside
  );

  return visible ? (
    <div className={styles['modal']} ref={modalRef}>
      <div className={styles['modal-mask']} />
      <div className={styles['modal-wrap']}>
        <div className={modalContent}>{children}</div>
      </div>
    </div>
  ) : (
    <></>
  );
}
