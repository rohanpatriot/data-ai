import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../WidgetBase';

// ToDo
// Still clunky, needs GeoJSON data to be passed in
// Also, need to figure out how to pass in data for the map without loading a whole bundle of GeoJSON data
interface MapWidgetProps {
  data: {
    title: string;
    geoData: object;
  };
  id: string;
  refresh?: () => void;
}

const MapWidget: React.FC<MapWidgetProps> = ({ data, id, refresh }) => {
  const options = {
    geo: {
      map: 'world',
      roam: true,
      ...data.geoData
    }
  };

  return (
    <WidgetBase widgetId={id} title={data.title} refresh={refresh}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default MapWidget;
