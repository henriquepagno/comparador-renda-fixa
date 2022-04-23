import React, { ReactElement } from 'react';
import { Form, Radio } from 'antd';

import { useConfig } from '../../hookStore/Config';

import styles from './TypeRadio.module.scss';

export default function TypeRadio(): ReactElement {
  const { getClassWithTheme } = useConfig();

  const labelClasses = getClassWithTheme(
    styles['label'],
    styles['label--light']
  );

  const radioClasses = getClassWithTheme(
    styles['radio'],
    styles['radio--light']
  );

  return (
    <div>
      <label className={labelClasses} htmlFor="categorySelect">
        Tipo
      </label>
      <Form.Item name="type">
        <Radio.Group className={radioClasses}>
          <Radio value={'PRE'}>Pré</Radio>
          <Radio value={'POS_CDI'}>Pós CDI</Radio>
          <Radio value={'POS_IPCA'}>Pós IPCA</Radio>
        </Radio.Group>
      </Form.Item>
    </div>
  );
}
