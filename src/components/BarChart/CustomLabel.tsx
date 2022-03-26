import React, { ReactElement, useMemo } from 'react';
import { Colors } from '../../common/enums/Colors';
import { currencyFormatter } from '../../common/functions/intlFormatters';

interface ICustomLabel {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  labelFill?: string;
  value?: number;
}

export default function CustomLabel(props: ICustomLabel): ReactElement {
  const { fill, value } = props;
  let { x, y, width, height } = props;

  x = x || 0;
  y = y || 0;
  width = width || 0;
  height = height || 0;

  const offset = 75;

  const formattedValue = useMemo(
    () => (value ? currencyFormatter.format(value) : 0),
    [value]
  );

  const labelFill: string = useMemo(() => {
    if (fill === Colors.Yellow || fill === '#82ca9d') {
      return '#918e8e';
    } else {
      return '#e8e8e8';
    }
  }, [fill]);

  return (
    <text
      x={x + width - offset}
      y={y + height / 2}
      textAnchor="middle"
      dy={4}
      fill={labelFill}
    >
      {formattedValue}
    </text>
  );
}
