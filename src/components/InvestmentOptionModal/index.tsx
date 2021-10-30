import React, { ReactElement, useState } from 'react';
import { Form } from 'antd';
import ShortUniqueId from 'short-unique-id';

import Modal from '../Modal';
import Header from './Header';
import Footer from './Footer';

import CategorySelect from '../CategorySelect';
import TypeRadio from '../TypeRadio';
import InputNumber from '../InputNumber';

import { useModal } from '../../hookStore/Modal';
import { useInformation } from '../../hookStore/Information';

import styles from './InvestmentOptionModal.module.scss';

export default function InvestmentOptionModal(): ReactElement {
  const { isInvestmentOptionModalVisible, storeInvestmentOptionModalVisible } =
    useModal();
  const { addInvestmentOption } = useInformation();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const uid = new ShortUniqueId({ length: 3 });

    addInvestmentOption({
      id: uid(),
      category: values.category.value,
      type: values.type,
      interest: values.interest,
    });

    storeInvestmentOptionModalVisible(false);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onCancel = () => {
    storeInvestmentOptionModalVisible(false);
    form.resetFields();
  };

  const [interest, setInterest] = useState(0);

  return (
    <Modal
      visible={isInvestmentOptionModalVisible}
      setVisible={storeInvestmentOptionModalVisible}
    >
      <Header
        title="Nova Opção de Investimento"
        onClose={() => {
          storeInvestmentOptionModalVisible(false);
        }}
      />
      <div className={styles['content']}>
        <Form
          name="basic"
          form={form}
          initialValues={{
            category: { value: 'CDB', label: 'CDB' },
            type: 'PRE',
            interest: 1,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={styles['form']}
        >
          <CategorySelect />
          <TypeRadio />
          <Form.Item name="interest">
            <InputNumber
              inputId="taxaInput"
              label="Taxa"
              allowDecimal
              value={interest}
              onChange={(e) => setInterest(e)}
              min={0.1}
            />
          </Form.Item>
        </Form>
      </div>
      <Footer onCancel={onCancel} form={form} />
    </Modal>
  );
}
