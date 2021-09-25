import React, { ReactElement } from 'react';

import Modal from '../Modal';

import { useModal } from '../../hookStore/Modal';

export default function InvestmentOptionModal(): ReactElement {
  const { isInvestmentOptionModalVisible, storeInvestmentOptionModalVisible } =
    useModal();

  return (
    <Modal
      visible={isInvestmentOptionModalVisible}
      setVisible={storeInvestmentOptionModalVisible}
      // onOk={handleOk}
      // onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
