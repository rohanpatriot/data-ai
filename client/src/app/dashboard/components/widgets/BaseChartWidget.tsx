import React from "react";
import ReactECharts from "echarts-for-react";
import WidgetBase from "./WidgetBase";

interface BaseChartWidgetProps {
  title?: string;
  options: any;
}

const BaseChartWidget: React.FC<BaseChartWidgetProps> = ({
  title,
  options,
}) => (
  <WidgetBase title={title}>
    <ReactECharts option={options} style={{ height: "100%", width: "100%" }} />
  </WidgetBase>
);

export default BaseChartWidget;
