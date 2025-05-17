import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../../WidgetBase';

interface BubbleChartWidgetProps {
  data: {
    bubbles: { x: number; y: number; r: number }[];
  };
}

const BubbleChartWidget: React.FC<BubbleChartWidgetProps> = ({ data }) => {
  const options = {
    xAxis: { type: 'value' },
    yAxis: { type: 'value' },
    series: [{
      type: 'scatter',
      symbolSize: (data: number[]) => data[2] * 10,
      data: data.bubbles.map(b => [b.x, b.y, b.r])
    }]
  };

  return (
    <WidgetBase>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default BubbleChartWidget;
