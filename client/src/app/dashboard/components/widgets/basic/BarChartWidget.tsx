import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../WidgetBase';

interface BarChartWidgetProps {
  data: {
    categories: string[];
    series: { name: string; data: number[] }[];
  };
}

const BarChartWidget: React.FC<BarChartWidgetProps> = ({ data }) => {
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: data.series.map(s => s.name)
    },
    xAxis: {
      type: 'category',
      data: data.categories
    },
    yAxis: {
      type: 'value'
    },
    series: data.series.map(s => ({
      name: s.name,
      type: 'bar',
      data: s.data
    }))
  };

  return (
    <WidgetBase>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default BarChartWidget;
