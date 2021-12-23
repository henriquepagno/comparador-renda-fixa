import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { AiOutlineDelete } from 'react-icons/ai';

import getDescriptionType from '../../common/functions/getDescriptionType';

import Tag from '../Tag';
import Medal from '../Medal';
import Button from '../Button';

import styles from './InvestmentCard.module.scss';

interface IInvestmentCard {
  id: string;
  category: string;
  type: 'PRE' | 'POS_CDI' | 'POS_IPCA';
  interest: number;
  color: 'pink' | 'red' | 'purple' | 'blue' | 'yellow' | 'orange' | '';
  netYield?: number;
  grossYield?: number;
  ranking?: number;
  onRemove(): void;
  onMouseOverFunction(): void;
  onMouseLeaveFunction(): void;
}

export default function InvestmentCard({
  category,
  type,
  interest,
  color,
  netYield,
  grossYield,
  ranking,
  onRemove,
  onMouseOverFunction,
  onMouseLeaveFunction,
}: IInvestmentCard): ReactElement {
  const classes = clsx(
    styles['container'],
    styles[`container--${color.toLowerCase()}`]
  );

  const typeDescription = getDescriptionType(type);

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
    <div
      className={classes}
      onMouseOver={() => {
        onMouseOverFunction();
      }}
      onMouseLeave={() => {
        onMouseLeaveFunction();
      }}
    >
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
        <Tag description={category} color={color} />
      </div>
      <div className={styles['attributes']}>
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
