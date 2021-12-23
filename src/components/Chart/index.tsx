import React, { ReactElement } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { getColor } from '../../common/functions/color';
import getDescriptionType from '../../common/functions/getDescriptionType';

import { useChart } from '../../hookStore/Chart';
import { useInformation } from '../../hookStore/Information';

import LoadingData from '../LoadingData';
import NoChartData from '../NoChartData';

import styles from './Chart.module.scss';

export default function Chart(): ReactElement {
  const { loading, chartData } = useChart();
  const { investmentOptions } = useInformation();

  return (
    <div className={styles['chart']}>
      <LoadingData loading={loading}>
        {chartData.length === 0 ? (
          <NoChartData />
        ) : (
          <>
            <ResponsiveContainer width="100%" height="95%" debounce={1}>
              <LineChart
                data={chartData}
                margin={{
                  top: 15,
                  right: 25,
                  left: -10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="IPCA"
                  stroke="#8884d8"
                  strokeDasharray="3 3"
                />
                <Line
                  type="monotone"
                  dataKey="CDI"
                  stroke="#82ca9d"
                  strokeDasharray="3 3"
                />
                {investmentOptions.map((investment, index) => {
                  return (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={investment.id}
                      name={`${investment.category} ${getDescriptionType(
                        investment.type
                      )} ${investment.interest}%`}
                      stroke={getColor(investment.color)}
                      legendType="diamond"
                      strokeWidth={investment.shouldHighlight ? 4 : 2}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
            <p className={styles['ir-message']}>
              <sup>*</sup> Uma queda do investimento no gráfico indica a dedução
              de Imposto de Renda.
            </p>
          </>
        )}
      </LoadingData>
    </div>
  );
}
