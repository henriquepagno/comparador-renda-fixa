import React, { ReactElement } from 'react';
import { Form, Radio } from 'antd';

import styles from './TypeRadio.module.scss';

export default function TypeRadio(): ReactElement {
  return (
    <div>
      <label className={styles['label']} htmlFor="categorySelect">
        Tipo
      </label>
      <Form.Item name="type">
        <Radio.Group className={styles['radio']}>
          <Radio value={'PRE'}>Pré</Radio>
          <Radio value={'POS_CDI'}>Pós CDI</Radio>
          <Radio value={'POS_IPCA'}>Pós IPCA</Radio>
        </Radio.Group>
      </Form.Item>
    </div>
  );
}
