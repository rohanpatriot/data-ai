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
  refresh?: () => void;
}

const PlotChartWidget: React.FC<PlotChartWidgetProps> = ({ data, id, refresh }) => {
  const options = getPlotChartOptions(data.x, data.y);
  return <BaseChartWidget id={id} title={data.title} options={options} refresh={refresh} />;
};

export default PlotChartWidget;
