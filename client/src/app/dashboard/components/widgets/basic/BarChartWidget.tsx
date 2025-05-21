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
  id: string;
}

const BarChartWidget: React.FC<BarChartWidgetProps> = ({ data, id }) => {
  const options = getBarChartOptions(data.categories, data.series);
  return <BaseChartWidget id={id} title={data.title} options={options} />;
};

export default BarChartWidget;
