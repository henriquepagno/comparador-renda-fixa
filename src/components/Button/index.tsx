import React, { ReactElement } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface IButtonProps {
  label: string;
  // eslint-disable-next-line no-unused-vars
  onClick(): void;
  icon?: React.ReactNode;
  type: 'primary' | 'secondary' | 'icon';
  className?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  label,
  onClick,
  icon,
  type,
  className,
  htmlType = 'button',
  disabled = false,
}: IButtonProps): ReactElement {
  const classes = clsx(
    styles['button'],
    type === 'primary' && styles['button--primary'],
    type === 'secondary' && styles['button--secondary'],
    type === 'icon' && styles['button--icon'],
    disabled && styles['button--disabled'],
    className && className
  );

  return (
    <button className={classes} type={htmlType} onClick={onClick}>
      {icon ? icon : null}
      {label}
    </button>
  );
}
