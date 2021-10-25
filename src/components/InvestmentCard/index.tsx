import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { AiOutlineDelete } from 'react-icons/ai';

import Tag from '../Tag';

import styles from './InvestmentCard.module.scss';
import Medal from '../Medal';
import Button from '../Button';

interface IInvestmentCard {
  id: string;
  category: string;
  type: 'PRE' | 'POS_CDI' | 'POS_IPCA';
  interest: number;
  color: 'pink' | 'red' | 'purple' | 'blue' | 'yellow' | 'orange';
  netYield?: number;
  grossYield?: number;
  ranking?: number;
  onRemove(): void;
}

export default function InvestmentCard({
  id,
  category,
  type,
  interest,
  color,
  netYield,
  grossYield,
  ranking,
  onRemove,
}: IInvestmentCard): ReactElement {
  const classes = clsx(
    styles['container'],
    styles[`container--${color.toLowerCase()}`]
  );

  let typeDescription;

  switch (type) {
    case 'PRE':
      typeDescription = 'Pré';
      break;
    case 'POS_CDI':
      typeDescription = 'Pós CDI';
      break;
    case 'POS_IPCA':
      typeDescription = 'Pós IPCA';
      break;
    default:
      break;
  }

  const percentFormatOption = {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  const percentFormatter = new Intl.NumberFormat('pt-BR', percentFormatOption);
  const formattedInterest = percentFormatter.format(interest / 100);

  const valueFormatOption = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  const valueFormatter = new Intl.NumberFormat('pt-BR', valueFormatOption);
  const formattedgrossYield = valueFormatter.format(grossYield || 0);
  const formattednetYield = valueFormatter.format(netYield || 0);

  return (
    <div className={classes}>
      <Button
        className={styles['delete-button']}
        icon={<AiOutlineDelete />}
        label=""
        onClick={() => {
          onRemove();
        }}
        type="icon"
      />
      <Medal ranking={ranking || 0} />
      <div className={styles['tag-container']}>
        <Tag description={id} color={color} />
      </div>
      <div className={styles['attributes']}>
        <p title={category}>{category}</p>
        <p title={typeDescription}>{typeDescription}</p>
        <p title={interest.toString()}>{formattedInterest}</p>
      </div>
      <div className={styles['calculated-values']}>
        {grossYield && (
          <span title={`Valor Bruto: ${formattedgrossYield}`}>
            {formattedgrossYield}
          </span>
        )}
        {netYield && (
          <span
            title={`Valor Líquido: ${formattednetYield}`}
            className={styles['calculated-values__net-yield']}
          >
            {formattednetYield}
          </span>
        )}
      </div>
    </div>
  );
}
