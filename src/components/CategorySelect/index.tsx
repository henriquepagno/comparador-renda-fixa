import React, { ReactElement } from 'react';
import { Form } from 'antd';
import Select from 'react-select';

import styles from './CategorySelect.module.scss';

export default function CategorySelect(): ReactElement {
  const options = [
    { value: 'CDB', label: 'CDB' },
    { value: 'LCI', label: 'LCI' },
    { value: 'LCA', label: 'LCA' },
  ];

  return (
    <div>
      <label className={styles['label']} htmlFor="categorySelect">
        Categoria
      </label>
      <Form.Item name="category" required>
        <Select
          id="categorySelect"
          options={options}
          placeholder=""
          className={styles['react-select-container']}
        />
      </Form.Item>
    </div>
  );
}
