import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../../WidgetBase';

interface TreemapWidgetProps {
  data: {
    name: string;
    value: number;
    children?: { name: string; value: number; children?: { name: string; value: number }[] }[];
  };
}

const TreemapWidget: React.FC<TreemapWidgetProps> = ({ data }) => {
  const options = {
    series: [{
      type: 'treemap',
      data: [data]
    }]
  };

  return (
    <WidgetBase>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default TreemapWidget;