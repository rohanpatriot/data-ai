// src/widgets/charts/PieChartWidget.tsx
import React from "react";
import { getPieChartOptions } from "../charts/chartOptions";
import BaseChartWidget from "../BaseChartWidget";

interface PieChartWidgetProps {
  data: {
    title: string;
    labels: string[];
    values: number[];
  };
}

const PieChartWidget: React.FC<PieChartWidgetProps> = ({ data }) => {
  const options = getPieChartOptions(data.labels, data.values);
  return <BaseChartWidget title={data.title} options={options} />;
};

export default PieChartWidget;
