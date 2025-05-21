import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../WidgetBase';

interface GaugeChartWidgetProps {
  data: {
    title: string;
    value: number;
    min: number;
    max: number;
  };
  id: string;
}

const GaugeChartWidget: React.FC<GaugeChartWidgetProps> = ({ data, id }) => {
  const options = {
    series: [{
      type: 'gauge',
      min: data.min,
      max: data.max,
      data: [{
        value: data.value
      }]
    }]
  };

  return (
    <WidgetBase widgetId={id} title={data.title}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default GaugeChartWidget;
