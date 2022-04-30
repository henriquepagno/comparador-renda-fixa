import React, { ReactElement } from 'react';
import { GiChart } from 'react-icons/gi';

import { useConfig } from '../../hookStore/Config';

import styles from './NoChartData.module.scss';

export default function NoChartData(): ReactElement {
  const { getClassWithTheme } = useConfig();

  const classes = getClassWithTheme(
    styles['container'],
    styles['container--light']
  );

  return (
    <div className={classes}>
      <p>
        Clique no botão &quot;Adicionar&quot; para inserir até seis opções de
        investimento. <br />
        Pressione o botão &quot;Calcular&quot; para visualizar o gráfico.
      </p>
      <GiChart />
    </div>
  );
}
