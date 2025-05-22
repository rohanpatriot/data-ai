import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../../WidgetBase';

interface HeatMapWidgetProps {
  data: {
    title: string;
    xLabels: string[];
    yLabels: string[];
    data: number[][];
  };
  id: string;
  refresh?: () => void;
}

const HeatMapWidget: React.FC<HeatMapWidgetProps> = ({ data, id, refresh }) => {
  const options = {
    xAxis: {
      type: 'category',
      data: data.xLabels
    },
    yAxis: {
      type: 'category',
      data: data.yLabels
    },
    visualMap: {
      min: Math.min(...data.data.flat()),
      max: Math.max(...data.data.flat()),
      calculable: true
    },
    series: [{
      type: 'heatmap',
      data: data.data.flat().map((value, index) => [
        index % data.xLabels.length,
        Math.floor(index / data.xLabels.length),
        value
      ])
    }]
  };

  return (
    <WidgetBase widgetId={id} title={data.title} refresh={refresh}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default HeatMapWidget;
