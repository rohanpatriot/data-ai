// src/widgets/charts/BarChartWidget.tsx
import React from "react";
import { getBarChartOptions } from "../charts/chartOptions";
import BaseChartWidget from "../BaseChartWidget";

interface BarChartWidgetProps {
  data: {
    title: string;
    categories: string[];
    series: { name: string; data: number[] }[];
  };
}

const BarChartWidget: React.FC<BarChartWidgetProps> = ({ data }) => {
  const options = getBarChartOptions(data.categories, data.series);
  return <BaseChartWidget title={data.title} options={options} />;
};

export default BarChartWidget;
