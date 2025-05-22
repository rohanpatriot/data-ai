import React from "react";
import ReactECharts from "echarts-for-react";
import WidgetBase from "./WidgetBase";

interface BaseChartWidgetProps {
  id: string;
  title?: string;
  refresh?: () => void;
  options: any;
}

const BaseChartWidget: React.FC<BaseChartWidgetProps> = ({
  id,
  title,
  refresh,
  options,
}) => (
  <WidgetBase widgetId={id} title={title} refresh={refresh}>
    <ReactECharts option={options} style={{ height: "100%", width: "100%" }} />
  </WidgetBase>
);

export default BaseChartWidget;
