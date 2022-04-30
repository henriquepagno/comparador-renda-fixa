import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { AiOutlineDelete } from 'react-icons/ai';

import getDescriptionType from '../../common/functions/getDescriptionType';
import {
  percentFormatter,
  currencyFormatter,
} from '../..//common/functions/intlFormatters';
import { Theme } from '../../common/enums/Theme';

import { useConfig } from '../../hookStore/Config';

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
  const { theme, getClassWithTheme } = useConfig();

  const classes = clsx(
    styles['container'],
    styles[`container--${color.toLowerCase()}`],
    theme == Theme.Light && styles['container--light']
  );

  const deleteButtonClasses = getClassWithTheme(
    styles['delete-button'],
    styles['delete-button--light']
  );

  const typeDescription = getDescriptionType(type);

  const formattedInterest = percentFormatter.format(interest / 100);

  const formattedgrossYield = currencyFormatter.format(grossYield || 0);
  const formattednetYield = currencyFormatter.format(netYield || 0);

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
        className={deleteButtonClasses}
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
