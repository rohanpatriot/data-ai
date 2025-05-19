import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../WidgetBase';

interface HistogramWidgetProps {
  data: {
    title: string;
    bins: number[];
    counts: number[];
  };
}

const HistogramWidget: React.FC<HistogramWidgetProps> = ({ data }) => {
  const options = {
    xAxis: {
      type: 'category',
      data: data.bins.map(String)
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'bar',
      data: data.counts
    }]
  };

  return (
    <WidgetBase title={data.title}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default HistogramWidget;
