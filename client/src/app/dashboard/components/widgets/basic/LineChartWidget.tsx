// src/widgets/charts/LineChartWidget.tsx
import React from "react";
import { getLineChartOptions } from "../charts/chartOptions";
import BaseChartWidget from "../BaseChartWidget";

interface LineChartWidgetProps {
  data: {
    title?: string;
    xAxis: string[];
    series: { name: string; data: number[] }[];
  };
}

const LineChartWidget: React.FC<LineChartWidgetProps> = ({ data }) => {
  const options = getLineChartOptions(data.xAxis, data.series);
  return <BaseChartWidget title={data.title} options={options} />;
};

export default LineChartWidget;
