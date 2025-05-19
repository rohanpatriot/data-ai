import React from "react";
import { getAreaChartOptions } from "../charts/chartOptions";
import BaseChartWidget from "../BaseChartWidget";

interface AreaChartWidgetProps {
  data: {
    title: string;
    xAxis: string[];
    series: { name: string; data: number[] }[];
  };
}

const AreaChartWidget: React.FC<AreaChartWidgetProps> = ({ data }) => {
  const options = getAreaChartOptions(data.xAxis, data.series);
  return <BaseChartWidget title={data.title} options={options} />;
};

export default AreaChartWidget;
