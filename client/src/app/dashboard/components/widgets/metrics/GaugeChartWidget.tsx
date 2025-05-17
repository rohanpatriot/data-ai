import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../WidgetBase';

interface GaugeChartWidgetProps {
  data: {
    value: number;
    min: number;
    max: number;
  };
}

const GaugeChartWidget: React.FC<GaugeChartWidgetProps> = ({ data }) => {
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
    <WidgetBase>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default GaugeChartWidget;
