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
  id: string;
  refresh: () => void;
}

const LineChartWidget: React.FC<LineChartWidgetProps> = ({ data, id, refresh }) => {
  const options = getLineChartOptions(data.xAxis, data.series);
  return <BaseChartWidget id={id} title={data.title} options={options} refresh={refresh} />;
};

export default LineChartWidget;
