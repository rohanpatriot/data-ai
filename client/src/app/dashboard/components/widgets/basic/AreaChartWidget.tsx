import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../WidgetBase';

interface AreaChartWidgetProps {
  data: {
    xAxis: string[];
    series: { name: string; data: number[] }[];
  };
}

const AreaChartWidget: React.FC<AreaChartWidgetProps> = ({ data }) => {
  const options = {
    xAxis: {
      type: 'category',
      data: data.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: data.series.map(s => ({
      name: s.name,
      type: 'line',
      areaStyle: {},
      data: s.data
    }))
  };

  return (
    <WidgetBase>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default AreaChartWidget;
