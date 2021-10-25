import React, { ReactElement } from 'react';
import { FormInstance } from 'antd';

import Button from '../../Button';

import styles from './Footer.module.scss';

interface IFooterProps {
  onCancel(): void;
  form: FormInstance<any>;
}

export default function Footer({ onCancel, form }: IFooterProps): ReactElement {
  const onSubmit = () => {
    form.submit();
  };

  return (
    <div className={styles['footer']}>
      <Button type="secondary" label="Cancelar" onClick={onCancel} />
      <Button
        type="primary"
        label="Salvar"
        htmlType="submit"
        onClick={onSubmit}
      />
    </div>
  );
}
