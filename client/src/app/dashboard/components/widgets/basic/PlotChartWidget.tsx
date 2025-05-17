import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../WidgetBase';

interface PlotChartWidgetProps {
  data: {
    x: number[];
    y: number[];
  };
}

const PlotChartWidget: React.FC<PlotChartWidgetProps> = ({ data }) => {
  const options = {
    xAxis: { type: 'value' },
    yAxis: { type: 'value' },
    series: [{
      type: 'scatter',
      data: data.x.map((x, i) => [x, data.y[i]])
    }]
  };

  return (
    <WidgetBase>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default PlotChartWidget;
