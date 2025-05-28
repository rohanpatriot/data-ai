import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import WidgetBase from "./WidgetBase";
import {
  applyThemeToChartOptions,
  useWidgetTheme,
} from "./util/chartThemeUtil";

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
  const chartRef = useRef<any>(null);

  // Force resize after mount to fix initial sizing issue
  useEffect(() => {
    const timer = setTimeout(() => {
      if (chartRef.current) {
        const chartInstance = chartRef.current.getEchartsInstance();
        if (chartInstance) {
          chartInstance.resize();
        }
      }
    }, 420); // Small delay to ensure container is fully rendered

    return () => clearTimeout(timer);
  }, []);

  return (
    <WidgetBase
      widgetId={id}
      title={title}
      refresh={refresh}
      onReference={onReference}
    >
      <ReactECharts
        ref={chartRef}
        option={themedOptions}
        style={{ height: "100%", width: "100%" }}
        key={`chart-${id}-${themePreset}`}
        opts={{ renderer: "canvas" }}
      />
    </WidgetBase>
  );
};

export default BaseChartWidget;
