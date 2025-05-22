import * as Widgets from "../index";

export interface WidgetTypeMap {
  LineChart: { xAxis: string[]; series: { name: string; data: number[] }[] };
  PieChart: { title: string; labels: string[]; values: number[] };
  StatsCard: { title: string; value: number; icon?: string };
  BarChart: {
    title: string;
    categories: string[];
    series: { name: string; data: number[] }[];
  };
  Table: {
    title: string;
    columns: string[];
    rows: Record<string, string | number | boolean | null>[];
  };
  Map: { title: string; geoData: object };
  Text: { title: string; content: string };
  SmallText: { title: string; content: string };
  Image: { title: string; src: string; alt?: string };
  PlotChart: { title: string; x: number[]; y: number[] };
  Histogram: { title: string; bins: number[]; counts: number[] };
  ScatterPlot: { title: string; points: { x: number; y: number }[] };
  BoxPlot: { title: string; categories: string[]; values: number[][] };
  HeatMap: {
    title: string;
    xLabels: string[];
    yLabels: string[];
    data: number[][];
  };
  WordCloud: { title: string; words: { text: string; value: number }[] };
  BubbleChart: {
    title: string;
    bubbles: { x: number; y: number; r: number }[];
  };
  Treemap: {
    title: string;
    value: number;
    children?: Array<{
      name: string;
      value: number;
      children?: Array<{ name: string; value: number }>;
    }>;
  };
  Timeline: { title: string; events: { date: string; label: string }[] };
  AreaChart: {
    title: string;
    xAxis: string[];
    series: { name: string; data: number[] }[];
  };
  KPI: { title: string; value: number; trend?: number };
  Progress: { title: string; value: number; label?: string };
}

type WidgetKey = keyof WidgetTypeMap;

interface WidgetSizeConstraints {
  minW: number;
  minH: number;
  maxW?: number;
  maxH?: number;
}

const widgetSizeConstraints: Record<WidgetKey, WidgetSizeConstraints> = {
  LineChart: { minW: 4, minH: 6, maxW: 12, maxH: 12 },
  PieChart: { minW: 4, minH: 6, maxW: 6, maxH: 12 },
  StatsCard: { minW: 2, minH: 6, maxW: 4, maxH: 10 },
  BarChart: { minW: 4, minH: 6, maxW: 12, maxH: 12 },
  Table: { minW: 4, minH: 6 },
  Map: { minW: 4, minH: 6, maxW: 12, maxH: 12 },
  Text: { minW: 4, minH: 6 },
  SmallText: { minW: 2, minH: 3 },
  Image: { minW: 4, minH: 6 },
  PlotChart: { minW: 4, minH: 6, maxW: 10, maxH: 12 },
  Histogram: { minW: 4, minH: 6, maxW: 10, maxH: 12 },
  ScatterPlot: { minW: 4, minH: 6, maxW: 10, maxH: 12 },
  BoxPlot: { minW: 4, minH: 6, maxW: 10, maxH: 10 },
  HeatMap: { minW: 4, minH: 6, maxW: 10, maxH: 10 },
  WordCloud: { minW: 4, minH: 6, maxW: 10, maxH: 12 },
  BubbleChart: { minW: 4, minH: 6, maxW: 10, maxH: 12 },
  Treemap: { minW: 4, minH: 6, maxW: 10, maxH: 12 },
  Timeline: { minW: 2, minH: 6, maxW: 6, maxH: 12 },
  AreaChart: { minW: 4, minH: 6, maxW: 10, maxH: 12 },
  KPI: { minW: 2, minH: 3, maxW: 4, maxH: 4 },
  Progress: { minW: 4, minH: 3, maxW: 12, maxH: 8 },
};

export const widgetRegistry: {
  [K in WidgetKey]: React.ComponentType<{ data: WidgetTypeMap[K]; id: string, refresh: () => void }>;
} = {
  LineChart: Widgets.LineChartWidget,
  PieChart: Widgets.PieChartWidget,
  StatsCard: Widgets.StatsCardWidget,
  BarChart: Widgets.BarChartWidget,
  Table: Widgets.TableWidget,
  Map: Widgets.MapWidget,
  Text: Widgets.TextWidget,
  SmallText: Widgets.SmallTextWidget,
  Image: Widgets.ImageWidget,
  PlotChart: Widgets.PlotChartWidget,
  Histogram: Widgets.HistogramWidget,
  ScatterPlot: Widgets.ScatterPlotWidget,
  BoxPlot: Widgets.BoxPlotWidget,
  HeatMap: Widgets.HeatMapWidget,
  WordCloud: Widgets.WordCloudWidget,
  BubbleChart: Widgets.BubbleChartWidget,
  Treemap: Widgets.TreemapWidget,
  Timeline: Widgets.TimelineWidget,
  AreaChart: Widgets.AreaChartWidget,
  KPI: Widgets.KPIWidget,
  Progress: Widgets.ProgressWidget,
};

export interface WidgetConfig<K extends WidgetKey = WidgetKey> {
  id: string;
  name: string;
  type: K;
  data: WidgetTypeMap[K];
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

export function getWidgetSizeConstraints<K extends WidgetKey>(
  type: K
): WidgetSizeConstraints {
  return widgetSizeConstraints[type];
}
