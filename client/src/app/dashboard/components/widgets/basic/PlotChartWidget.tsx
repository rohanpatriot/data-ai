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
  id: string;
}

const PlotChartWidget: React.FC<PlotChartWidgetProps> = ({ data, id }) => {
  const options = getPlotChartOptions(data.x, data.y);
  return <BaseChartWidget id={id} title={data.title} options={options} />;
};

export default PlotChartWidget;
