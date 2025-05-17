import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../WidgetBase';

interface PieChartWidgetProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const PieChartWidget: React.FC<PieChartWidgetProps> = ({ data }) => {
  const options = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    series: [{
      type: 'pie',
      radius: '65%',
      data: data.labels.map((label, index) => ({
        name: label,
        value: data.values[index]
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  return (
    <WidgetBase>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default PieChartWidget;
