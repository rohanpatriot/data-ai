import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../WidgetBase';

interface ScatterPlotWidgetProps {
  data: {
    title: string;
    points: { x: number; y: number }[];
  };
}

const ScatterPlotWidget: React.FC<ScatterPlotWidgetProps> = ({ data }) => {
  const options = {
    xAxis: { type: 'value' },
    yAxis: { type: 'value' },
    series: [{
      type: 'scatter',
      data: data.points.map(p => [p.x, p.y])
    }]
  };

  return (
    <WidgetBase title={data.title}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default ScatterPlotWidget;
