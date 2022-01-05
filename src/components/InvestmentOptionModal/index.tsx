import React, { ReactElement, useCallback, useState } from 'react';
import { Form } from 'antd';

import Modal from '../Modal';
import Header from './Header';
import Footer from './Footer';

import CategorySelect from '../CategorySelect';
import TypeRadio from '../TypeRadio';
import NumberField from '../NumberField';

import { percentFormatter } from '../..//common/functions/intlFormatters';

import { useModal } from '../../hookStore/Modal';
import { useInformation } from '../../hookStore/Information';
import { useToast } from '../../hookStore/Toast';
import { useThirdParty } from '../../hookStore/ThirdParty';

import styles from './InvestmentOptionModal.module.scss';

export default function InvestmentOptionModal(): ReactElement {
  const { isInvestmentOptionModalVisible, storeInvestmentOptionModalVisible } =
    useModal();
  const { addInvestmentOption, investmentOptions } = useInformation();
  const { addToast } = useToast();
  const { yearlyDi, yearlyIpca } = useThirdParty();
  const [formType, setFormType] = useState('PRE');

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const category = values.category.value;
    const { type, interest } = values;

    if (
      investmentOptions.findIndex(
        (inv) =>
          inv.category === category &&
          inv.type === type &&
          inv.interest === interest
      ) >= 0
    ) {
      addToast({
        title: 'Não permitido.',
        description:
          'Já existe uma opção de investimento com as mesmas informações.',
        type: 'info',
      });
    } else {
      addInvestmentOption({
        category: category,
        type: type,
        interest: interest,
      });

      storeInvestmentOptionModalVisible(false);
      setInterest(1);
      setFormType('PRE');
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onCancel = () => {
    storeInvestmentOptionModalVisible(false);
    setInterest(1);
    setFormType('PRE');
    form.resetFields();
  };

  const [interest, setInterest] = useState(0);

  const getTypeDescription = useCallback(() => {
    switch (formType) {
      case 'PRE':
        return null;
      case 'POS_CDI':
        return (
          <span className={styles['type-description']} title="Taxa DI">
            &rarr; {percentFormatter.format((yearlyDi * interest) / 100 / 100)}
          </span>
        );
      case 'POS_IPCA':
        return (
          <span className={styles['type-description']} title="Taxa IPCA">
            + {percentFormatter.format(yearlyIpca / 100)}
          </span>
        );
      default:
        break;
    }
  }, [formType, yearlyDi, yearlyIpca, interest]);

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
          onValuesChange={({ type }) => type && setFormType(type)}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={styles['form']}
        >
          <CategorySelect />
          <TypeRadio />
          <div className={styles['interest-content']}>
            <Form.Item name="interest">
              <NumberField
                inputId="taxaInput"
                label="Taxa"
                value={interest}
                minValue={0.1}
                onChange={() => {}}
                onBlur={(e) => setInterest(e)}
                format="0.00"
                endLabel="%"
              />
            </Form.Item>
            {getTypeDescription()}
          </div>
        </Form>
      </div>
      <Footer onCancel={onCancel} form={form} />
    </Modal>
  );
}
