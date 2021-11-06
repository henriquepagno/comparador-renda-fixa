import React, { ReactElement, useRef, ReactNode } from 'react';

import useVisibleHandler from '../../hooks/useVisibleHandler';

import styles from './Modal.module.scss';

interface IModalProps {
  visible: boolean;
  // eslint-disable-next-line no-unused-vars
  setVisible(visible: boolean): void;
  children: ReactNode;
}

export default function Modal({
  visible,
  setVisible,
  children,
}: IModalProps): ReactElement {
  const modalRef = useRef<any>();

  useVisibleHandler(
    modalRef,
    () => {
      if (visible) {
        setVisible(false);
      }
    },
    true
  );

  return visible ? (
    <div className={styles['modal']} ref={modalRef}>
      <div className={styles['modal-mask']} />
      <div className={styles['modal-wrap']}>
        <div className={styles['modal-content']}>{children}</div>
      </div>
    </div>
  ) : (
    <></>
  );
}
