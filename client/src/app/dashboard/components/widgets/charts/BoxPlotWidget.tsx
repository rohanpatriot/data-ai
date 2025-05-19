import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../WidgetBase';

interface BoxPlotWidgetProps {
  data: {
    title: string;
    categories: string[];
    values: number[][];
  };
}

const BoxPlotWidget: React.FC<BoxPlotWidgetProps> = ({ data }) => {
  const options = {
    xAxis: {
      type: 'category',
      data: data.categories
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'boxplot',
      data: data.values
    }]
  };

  return (
    <WidgetBase title={data.title}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default BoxPlotWidget;
