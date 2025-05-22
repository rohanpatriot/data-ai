import React from "react";
import { getAreaChartOptions } from "../charts/chartOptions";
import BaseChartWidget from "../BaseChartWidget";

interface AreaChartWidgetProps {
  data: {
    title: string;
    xAxis: string[];
    series: { name: string; data: number[] }[];
  };
  id: string;
  refresh?: () => void;
}

const AreaChartWidget: React.FC<AreaChartWidgetProps> = ({ data, id, refresh }) => {
  const options = getAreaChartOptions(data.xAxis, data.series);
  return <BaseChartWidget id={id} title={data.title} options={options} refresh={refresh} />;
};

export default AreaChartWidget;
