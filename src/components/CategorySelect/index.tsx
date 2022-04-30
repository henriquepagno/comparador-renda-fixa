import React, { ReactElement } from 'react';
import { Form } from 'antd';
import Select from 'react-select';

import { useConfig } from '../../hookStore/Config';

import styles from './CategorySelect.module.scss';

export default function CategorySelect(): ReactElement {
  const options = [
    { value: 'CDB', label: 'CDB' },
    { value: 'LCI', label: 'LCI' },
    { value: 'LCA', label: 'LCA' },
  ];

  const { getClassWithTheme } = useConfig();

  const labelClasses = getClassWithTheme(
    styles['label'],
    styles['label--light']
  );

  const reactSelectClasses = getClassWithTheme(
    styles['react-select-container'],
    styles['react-select-container--light']
  );

  return (
    <div>
      <label className={labelClasses} htmlFor="categorySelect">
        Categoria
      </label>
      <Form.Item name="category" required>
        <Select
          id="categorySelect"
          options={options}
          placeholder=""
          className={reactSelectClasses}
        />
      </Form.Item>
    </div>
  );
}
