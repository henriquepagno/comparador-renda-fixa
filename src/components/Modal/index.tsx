import React, { ReactElement, useRef } from 'react';

import useVisibleHandler from '../../hooks/useVisibleHandler';

import styles from './Modal.module.scss';

interface IModalProps {
  visible: boolean;
  // eslint-disable-next-line no-unused-vars
  setVisible(visible: boolean): void;
  children: React.ReactNode;
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
    <div className={styles['container']} ref={modalRef}>
      <div className={styles['content']}>{children}</div>
    </div>
  ) : (
    <></>
  );
}
