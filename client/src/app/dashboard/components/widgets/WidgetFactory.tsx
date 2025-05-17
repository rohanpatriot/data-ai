import { Layout } from 'react-grid-layout';
import * as Widgets from './index';

interface WidgetTypeMap {
  LineChart: { xAxis: string[]; series: { name: string; data: number[] }[] };
  PieChart: { labels: string[]; values: number[] };
  StatsCard: { title: string; value: number; icon?: string };
  BarChart: { categories: string[]; series: { name: string; data: number[] }[] };
  Table: { columns: string[]; rows: Record<string, string | number | boolean | null>[] };
  Map: { geoData: object };
  Text: { content: string };
  Image: { src: string; alt?: string };
  PlotChart: { x: number[]; y: number[] };
  Histogram: { bins: number[]; counts: number[] };
  ScatterPlot: { points: { x: number; y: number }[] };
  BoxPlot: { categories: string[]; values: number[][] };
  HeatMap: { xLabels: string[]; yLabels: string[]; data: number[][] };
  WordCloud: { words: { text: string; value: number }[] };
  BubbleChart: { bubbles: { x: number; y: number; r: number }[] };
  Treemap: { name: string; value: number; children?: Array<{ name: string; value: number; children?: Array<{ name: string; value: number }> }> };
  Timeline: { events: { date: string; label: string }[] };
  GaugeChart: { value: number; min: number; max: number };
  AreaChart: { xAxis: string[]; series: { name: string; data: number[] }[] };
  KPI: { metric: string; value: number; trend?: number };
  Progress: { value: number; label?: string };
}

type WidgetKey = keyof WidgetTypeMap;

const widgetRegistry: {
  [K in WidgetKey]: React.ComponentType<{ data: WidgetTypeMap[K] }>;
} = {
  LineChart: Widgets.LineChartWidget,
  PieChart: Widgets.PieChartWidget,
  StatsCard: Widgets.StatsCardWidget,
  BarChart: Widgets.BarChartWidget,
  Table: Widgets.TableWidget,
  Map: Widgets.MapWidget,
  Text: Widgets.TextWidget,
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
  GaugeChart: Widgets.GaugeChartWidget,
  AreaChart: Widgets.AreaChartWidget,
  KPI: Widgets.KPIWidget,
  Progress: Widgets.ProgressWidget,
};

export interface WidgetConfig<K extends WidgetKey = WidgetKey> {
  id: string;
  type: K;
  data: WidgetTypeMap[K];
  layout: Partial<Layout>;
}

// Overload for generic usage
export function WidgetFactory<K extends WidgetKey>(
  type: K,
  data: WidgetTypeMap[K]
): React.ReactElement {
  const WidgetComponent = widgetRegistry[type] as React.ComponentType<{ data: WidgetTypeMap[K] }>;
  return <WidgetComponent data={data} />;
}