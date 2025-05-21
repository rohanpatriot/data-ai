import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../WidgetBase';

interface BoxPlotWidgetProps {
  data: {
    title: string;
    categories: string[];
    values: number[][];
  };
  id: string;
}

const BoxPlotWidget: React.FC<BoxPlotWidgetProps> = ({ data, id }) => {
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
    <WidgetBase title={data.title} widgetId={id}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default BoxPlotWidget;
