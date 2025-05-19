// src/widgets/charts/PlotChartWidget.tsx
import React from "react";
import { getPlotChartOptions } from "../charts/chartOptions";
import BaseChartWidget from "../BaseChartWidget";

interface PlotChartWidgetProps {
  data: {
    title: string;
    x: number[];
    y: number[];
  };
}

const PlotChartWidget: React.FC<PlotChartWidgetProps> = ({ data }) => {
  const options = getPlotChartOptions(data.x, data.y);
  return <BaseChartWidget title={data.title} options={options} />;
};

export default PlotChartWidget;
