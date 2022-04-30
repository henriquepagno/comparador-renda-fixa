import React, { ReactElement, useCallback } from 'react';
import {
  LineChart as LineChartRecharts,
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
import { currencyFormatter } from '../../common/functions/intlFormatters';
import { IChartData } from '../../common/interfaces/calculated-data';

import { useChart } from '../../hookStore/Chart';
import { useConfig } from '../../hookStore/Config';
import { useInformation } from '../../hookStore/Information';

import LoadingData from '../LoadingData';
import NoChartData from '../NoChartData';

import styles from './LineChart.module.scss';

export default function LineChart(): ReactElement {
  const { loading, chartData } = useChart();
  const { investmentOptions } = useInformation();
  const { getClassWithTheme } = useConfig();

  const chartClasses = getClassWithTheme(
    styles['chart'],
    styles['chart--light']
  );

  const responsiveChartClasses = getClassWithTheme(
    styles['responsive-chart'],
    styles['responsive-chart--light']
  );

  const calculateLeftMargin = useCallback((): number => {
    if (!chartData || chartData.length === 0) return 0;

    const lastPosition: IChartData = chartData.at(-1) as IChartData;
    let higherNumber = 0;

    Object.values(lastPosition).forEach((value) => {
      if (typeof value === 'number') {
        higherNumber = value > higherNumber ? value : higherNumber;
      }
    });

    const width = higherNumber.toString().length;

    let modifier = 8;

    if (width > 11) modifier = 7;

    return width * modifier;
  }, [chartData]);

  return (
    <div className={chartClasses}>
      <LoadingData loading={loading}>
        {chartData.length === 0 ? (
          <NoChartData />
        ) : (
          <>
            <ResponsiveContainer
              width="100%"
              height="95%"
              debounce={1}
              className={responsiveChartClasses}
            >
              <LineChartRecharts
                data={chartData}
                margin={{
                  top: 15,
                  right: 25,
                  left: calculateLeftMargin(),
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  domain={['auto', 'auto']}
                  tickFormatter={(tick) => currencyFormatter.format(tick)}
                />
                <Tooltip
                  formatter={(value: number) => currencyFormatter.format(value)}
                />
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
              </LineChartRecharts>
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
