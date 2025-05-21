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
}

const AreaChartWidget: React.FC<AreaChartWidgetProps> = ({ data, id }) => {
  const options = getAreaChartOptions(data.xAxis, data.series);
  return <BaseChartWidget id={id} title={data.title} options={options} />;
};

export default AreaChartWidget;
