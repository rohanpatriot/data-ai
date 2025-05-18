import { Layout } from 'react-grid-layout';
import * as Widgets from '../index';

export interface WidgetTypeMap {
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
  
  interface WidgetSizeConstraints {
    minW: number;
    minH: number;
    maxW?: number;
    maxH?: number;
  }
  
  const widgetSizeConstraints: Record<WidgetKey, WidgetSizeConstraints> = {
    LineChart: { minW: 2, minH: 6, maxW: 12, maxH: 12 },
    PieChart: { minW: 2, minH: 6, maxW: 6, maxH: 8 },
    StatsCard: { minW: 2, minH: 4, maxW: 4, maxH: 6 },
    BarChart: { minW: 2, minH: 6, maxW: 12, maxH: 12 },
    Table: { minW: 4, minH: 3 },
    Map: { minW: 4, minH: 6, maxW: 12, maxH: 10 },
    Text: { minW: 2, minH: 1 },
    Image: { minW: 2, minH: 2 },
    PlotChart: { minW: 2, minH: 6, maxW: 10, maxH: 10 },
    Histogram: { minW: 2, minH: 6, maxW: 10, maxH: 10 },
    ScatterPlot: { minW: 2, minH: 6, maxW: 10, maxH: 10 },
    BoxPlot: { minW: 2, minH: 6, maxW: 10, maxH: 10 },
    HeatMap: { minW: 2, minH: 6, maxW: 10, maxH: 10 },
    WordCloud: { minW: 2, minH: 6, maxW: 10, maxH: 10 },
    BubbleChart: { minW: 2, minH: 6, maxW: 10, maxH: 10 },
    Treemap: { minW: 2, minH: 6, maxW: 10, maxH: 10 },
    Timeline: { minW: 2, minH: 6, maxW: 6, maxH: 18 },
    GaugeChart: { minW: 4, minH: 6, maxW: 6, maxH: 8 },
    AreaChart: { minW: 2, minH: 6, maxW: 10, maxH: 10 },
    KPI: { minW: 2, minH: 3, maxW: 4, maxH: 4 }, 
    Progress: { minW: 2, minH: 1, maxW: 12, maxH: 4 },
  };
  
type WidgetKey = keyof WidgetTypeMap;
  
export const widgetRegistry: {
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
  
export function getWidgetSizeConstraints<K extends WidgetKey>(type: K): WidgetSizeConstraints {
    return widgetSizeConstraints[type];
  }
  