import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../../WidgetBase';

interface BubbleChartWidgetProps {
  data: {
    title: string;
    bubbles: { x: number; y: number; r: number }[];
  };
  id: string;
  refresh?: () => void;
  onReference?: (widgetId: string) => void;
}

const BubbleChartWidget: React.FC<BubbleChartWidgetProps> = ({ data, id, refresh, onReference }) => {
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
    <WidgetBase widgetId={id} title={data.title} refresh={refresh} onReference={onReference}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default BubbleChartWidget;
