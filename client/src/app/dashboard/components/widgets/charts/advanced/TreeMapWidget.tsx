import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../../WidgetBase';

interface TreemapWidgetProps {
  data: {
    title: string;
    value: number;
    children?: { name: string; value: number; children?: { name: string; value: number }[] }[];
  };
  id: string;
  refresh: () => void;
}

const TreemapWidget: React.FC<TreemapWidgetProps> = ({ data, id, refresh }) => {
  const options = {
    series: [{
      type: 'treemap',
      data: [data]
    }]
  };

  return (
    <WidgetBase widgetId={id} title={data.title} refresh={refresh}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default TreemapWidget;