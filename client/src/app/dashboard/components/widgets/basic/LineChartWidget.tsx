import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../WidgetBase';

interface LineChartWidgetProps {
  data: {
    title?: string;
    xAxis: string[];
    series: { name: string; data: number[] }[];
  };
}

const LineChartWidget: React.FC<LineChartWidgetProps> = ({ data }) => {
  const options = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: data.series.map((s) => s.name),
      bottom: 0,
    },
    xAxis: {
      type: 'category',
      data: data.xAxis,
    },
    yAxis: {
      type: 'value',
    },
    series: data.series.map((s) => ({
      name: s.name,
      type: 'line',
      data: s.data,
      smooth: true,
    })),
  };

  return (
    <WidgetBase title={data.title}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default LineChartWidget;