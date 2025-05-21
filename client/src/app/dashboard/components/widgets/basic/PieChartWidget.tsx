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
  id: string;
}

const PieChartWidget: React.FC<PieChartWidgetProps> = ({ data, id }) => {
  const options = getPieChartOptions(data.labels, data.values);
  return <BaseChartWidget id={id} title={data.title} options={options} />;
};

export default PieChartWidget;
