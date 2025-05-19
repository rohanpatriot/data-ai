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
}

const MapWidget: React.FC<MapWidgetProps> = ({ data }) => {
  const options = {
    geo: {
      map: 'world',
      roam: true,
      ...data.geoData
    }
  };

  return (
    <WidgetBase title={data.title}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default MapWidget;
