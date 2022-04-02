import React, { ReactElement, useCallback, useMemo } from 'react';
import {
  BarChart as BarChartRecharts,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  LabelList,
} from 'recharts';

import { getColor } from '../../common/functions/color';
import getDescriptionType from '../../common/functions/getDescriptionType';
import { IChartData } from '../../common/interfaces/calculated-data';

import { useChart } from '../../hookStore/Chart';
import { useInformation } from '../../hookStore/Information';

import LoadingData from '../LoadingData';
import NoChartData from '../NoChartData';
import CustomLabel from './CustomLabel';

import styles from './BarChart.module.scss';

export default function BarChart(): ReactElement {
  const { loading, chartData } = useChart();
  const { investmentOptions } = useInformation();

  const chartDataWithLabels = useMemo(
    () =>
      chartData.reduce(function (result: any, item) {
        let fill: string = '';
        let name: string = '';
        let labelFill: string = '';

        let shouldAdd: boolean = true;

        if (item.id === 'CDI') {
          fill = '#82ca9d';
          labelFill = 'eee';
          name = 'CDI';
        } else if (item.id === 'IPCA') {
          fill = '#8884d8';
          name = 'IPCA';
        } else {
          const investment = investmentOptions.find(
            (inv) => inv.id === item.id
          );
          if (investment) {
            fill = getColor(investment.color);
            name = `${investment.category} ${getDescriptionType(
              investment.type
            )} ${investment.interest}%`;
          } else {
            shouldAdd = false;
          }
        }

        if (shouldAdd) {
          const itemWithLabels = {
            ...item,
            fill: fill,
            labelFill: labelFill,
            name: name,
          };

          result.push(itemWithLabels);
        }

        return result;
      }, []),
    [chartData, investmentOptions]
  );

  const calculateLeftMargin = useCallback((): number => {
    if (!chartDataWithLabels || chartDataWithLabels.length === 0) return 0;

    const lastPosition: IChartData = chartDataWithLabels.at(-1) as IChartData;
    let width = 0;

    Object.entries(lastPosition).forEach((entry) => {
      const [key, value] = entry;

      if (key.toString() === 'name') {
        width =
          value.toString().length > width ? value.toString().length : width;
      }
    });

    let modifier = -4;

    if (width <= 5) modifier = -20;

    if (width > 12) modifier = -1.2;

    return width * modifier;
  }, [chartDataWithLabels]);

  return (
    <div className={styles['chart']}>
      <LoadingData loading={loading}>
        {chartDataWithLabels.length === 0 ? (
          <NoChartData />
        ) : (
          <>
            <ResponsiveContainer
              width="100%"
              height="95%"
              debounce={1}
              className={styles['responsive-chart']}
            >
              <BarChartRecharts
                data={chartDataWithLabels}
                layout="vertical"
                barCategoryGap={15}
                margin={{
                  top: 15,
                  right: 15,
                  left: calculateLeftMargin(),
                  bottom: 15,
                }}
              >
                <XAxis type="number" hide />
                <YAxis type="category" width={150} dataKey="name" />

                <Bar dataKey="value" isAnimationActive={false}>
                  <LabelList
                    dataKey="value"
                    position="insideRight"
                    content={<CustomLabel />}
                  />
                </Bar>
              </BarChartRecharts>
            </ResponsiveContainer>
          </>
        )}
      </LoadingData>
    </div>
  );
}
