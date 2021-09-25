import React, { ReactElement } from 'react';
import { IoIosAdd } from 'react-icons/io';

import { useModal } from '../../hookStore/Modal';

import styles from './AddButton.module.scss';

export default function AddButton(): ReactElement {
  const { storeInvestmentOptionModalVisible } = useModal();

  return (
    <div className={styles['add-button']}>
      <button
        className={styles['add-button__button']}
        type="button"
        onClick={() => {
          storeInvestmentOptionModalVisible(true);
        }}
      >
        <IoIosAdd />
        Adicionar
      </button>
    </div>
  );
}
