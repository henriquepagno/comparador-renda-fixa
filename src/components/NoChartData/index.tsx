import React, { ReactElement } from 'react';
import { GiChart } from 'react-icons/gi';

import styles from './NoChartData.module.scss';

export default function NoChartData(): ReactElement {
  return (
    <div className={styles['container']}>
      <p>
        Clique no botão &quot;Adicionar&quot; para inserir até seis opções de
        investimento. <br />
        Pressione o botão &quot;Calcular&quot; para visualizar o gráfico.
      </p>
      <GiChart />
    </div>
  );
}
