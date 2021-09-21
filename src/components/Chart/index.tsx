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

import { useCalculatedData } from '../../hookStore/CalculatedData';

import LoadingData from '../LoadingData';

import styles from './Chart.module.scss';

export default function Chart(): ReactElement {
  const { loading, chartData } = useCalculatedData();

  return (
    <div className={styles['chart']}>
      {loading ? (
        <LoadingData />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 10,
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
            <Line type="monotone" dataKey="IPCA" stroke="#8884d8" />
            <Line type="monotone" dataKey="CDI" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
