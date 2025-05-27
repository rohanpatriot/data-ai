import React from "react";
import ReactECharts from "echarts-for-react";
import WidgetBase from "./WidgetBase";
import { applyThemeToChartOptions, useWidgetTheme } from "./util/chartThemeUtil";

interface BaseChartWidgetProps {
  id: string;
  title?: string;
  refresh?: () => void;
  options: any;
  onReference?: (widgetId: string) => void;
}

const BaseChartWidget: React.FC<BaseChartWidgetProps> = ({
  id,
  title,
  refresh,
  options,
  onReference,
}) => {
  const { colors, themePreset } = useWidgetTheme();
  const themedOptions = applyThemeToChartOptions(options, colors);

  return (
    <WidgetBase widgetId={id} title={title} refresh={refresh} onReference={onReference}>
      <ReactECharts 
        option={themedOptions} 
        style={{ height: "100%", width: "100%" }} 
        key={`chart-${id}-${themePreset}`}/>
    </WidgetBase>
  )
};

export default BaseChartWidget;
