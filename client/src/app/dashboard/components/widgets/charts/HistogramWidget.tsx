import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../WidgetBase';

interface HistogramWidgetProps {
  data: {
    title: string;
    bins: number[];
    counts: number[];
  };
  id: string;
  refresh?: () => void;
}

const HistogramWidget: React.FC<HistogramWidgetProps> = ({ data, id, refresh }) => {
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
    <WidgetBase widgetId={id} title={data.title} refresh={refresh}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default HistogramWidget;
