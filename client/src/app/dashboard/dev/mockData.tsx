import { WidgetConfig } from "../components/widgets/util/WidgetUtil";
import logo from "@/assets/logo.svg";

// ToDo
// This is just sample mock dataset.
// This just simulates a bunch of components on the dashboard.
// It will be replaced by the actual dashboard components.
// PLS remember to delete this shit once done.
// ************ Map is still a bit clunky, let's revisit this later.
export const sampleWidgets: WidgetConfig[] = [
  {
    id: "kpi1",
    name: "Conversion rate",
    type: "KPI",
    data: { title: "Conversion Rate", value: 5.6, trend: 0.2 },
  },
  {
    id: "kpi2",
    name: "Conversion rate",
    type: "KPI",
    data: { title: "Customer Score", value: 8.9, trend: -0.1 },
  },
  {
    id: "stats1",
    name: "Conversion rate",
    type: "StatsCard",
    data: { title: "Total Users", value: 1024, icon: `${logo}` },
  },
  {
    id: "stats2",
    name: "Conversion rate",
    type: "StatsCard",
    data: { title: "Active Sessions", value: 256, icon: `${logo}` },
  },
  {
    id: "line1",
    name: "Conversion rate",
    type: "LineChart",
    data: {
      title: "Website Traffic",
      xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        { name: "Visits", data: [120, 200, 150, 80, 70, 110, 130] },
        { name: "Signups", data: [30, 70, 45, 50, 40, 60, 80] },
      ],
    },
  },
  {
    id: "pie1",
    name: "Conversion rate",
    type: "PieChart",
    data: {
      title: "Browser Usage",
      labels: ["Chrome", "Firefox", "Safari", "Edge", "Others"],
      values: [63.5, 15.2, 12.3, 4.8, 4.2],
    },
  },
  {
    id: "bar1",
    name: "Conversion rate",
    type: "BarChart",
    data: {
      title: "Revenue by Category",
      categories: ["Q1", "Q2", "Q3", "Q4"],
      series: [
        { name: "Revenue", data: [5000, 7000, 6000, 8000] },
        { name: "Profit", data: [2000, 3000, 2500, 4000] },
      ],
    },
  },

  {
    id: "text1",
    name: "Conversion rate",
    type: "Text",
    data: { title: "", content: "Welcome to the Dashboard!" },
  },
  {
    id: "text2",
    name: "Conversion rate",
    type: "Text",
    data: {
      title: "test title",
      content: "This is a text insight here. Take a look at the table!😂",
    },
  },
  {
    id: "table1",
    name: "Conversion rate",
    type: "Table",
    data: {
      title: "Top Products",
      columns: ["Name", "Age", "Country"],
      rows: [
        { Name: "Alice", Age: 30, Country: "USA" },
        { Name: "Bob", Age: 25, Country: "UK" },
        { Name: "Charlie", Age: 35, Country: "Canada" },
      ],
    },
  },

  {
    id: "image1",
    name: "Conversion rate",
    type: "Image",
    data: {
      title: "Company Logo",
      src: "https://phrazor.ai/assets/img/blogs-original/Impact%20of%20Good%20Insights%20in%20Business.jpg",
      alt: "Company Logo",
    },
  },
  {
    id: "image2",
    name: "Conversion rate",
    type: "Image",
    data: {
      title: "Promotional Banner",
      src: "https://www.slideteam.net/media/catalog/product/cache/1280x720/b/u/business_insight_ppt_powerpoint_presentation_layouts_graphics_template_cpb_Slide01.jpg",
      alt: "Promotional Banner",
    },
  },
  {
    id: "plot1",
    name: "Conversion rate",
    type: "PlotChart",
    data: {
      title: "Plot",
      x: [1, 2, 3, 4, 5],
      y: [10, 20, 15, 25, 30],
    },
  },
  {
    id: "histogram1",
    name: "Conversion rate",
    type: "Histogram",
    data: {
      title: "Histogram",
      bins: [0, 1, 2, 3, 4, 5],
      counts: [5, 10, 15, 20, 25, 30],
    },
  },
  {
    id: "scatter1",
    name: "Conversion rate",
    type: "ScatterPlot",
    data: {
      title: "Scatter Plot",
      points: [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 4 },
      ],
    },
  },
  {
    id: "boxplot1",
    name: "Conversion rate",
    type: "BoxPlot",
    data: {
      title: "Box Plot",
      categories: ["A", "B", "C"],
      values: [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 5, 6],
        [3, 4, 5, 6, 7],
      ],
    },
  },
  {
    id: "heatmap1",
    name: "Conversion rate",
    type: "HeatMap",
    data: {
      title: "Heat Map",
      xLabels: ["A", "B", "C"],
      yLabels: ["1", "2", "3"],
      data: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    },
  },
  {
    id: "wordcloud1",
    name: "Conversion rate",
    type: "WordCloud",
    data: {
      title: "Word Cloud",
      words: [
        { text: "React", value: 100 },
        { text: "JavaScript", value: 80 },
        { text: "TypeScript", value: 60 },
        { text: "HTML", value: 50 },
        { text: "CSS", value: 40 },
        { text: "Python", value: 30 },
        { text: "Node.js", value: 20 },
        { text: "PHP", value: 10 },
        { text: "Ruby", value: 5 },
        { text: "Java", value: 3 },
        { text: "C++", value: 2 },
        { text: "C#", value: 1 },
        { text: "Swift", value: 0.5 },
        { text: "Kotlin", value: 0.25 },
        { text: "Go", value: 0.1 },
        { text: "Rust", value: 0.05 },
      ],
    },
  },

  {
    id: "bubble1",
    name: "Conversion rate",
    type: "BubbleChart",
    data: {
      title: "Bubble Chart",
      bubbles: [
        { x: 1, y: 2, r: 3 },
        { x: 2, y: 3, r: 4 },
        { x: 3, y: 4, r: 5 },
      ],
    },
  },
  {
    id: "bubble2",
    name: "Conversion rate",
    type: "BubbleChart",
    data: {
      title: "Bubble Chart",
      bubbles: [
        { x: 4, y: 5, r: 6 },
        { x: 5, y: 6, r: 7 },
        { x: 6, y: 7, r: 8 },
      ],
    },
  },
  {
    id: "treemap1",
    name: "Conversion rate",
    type: "Treemap",
    data: {
      title: "Treemap",
      value: 100,
      children: [
        { name: "Child 1", value: 50 },
        { name: "Child 2", value: 30 },
        { name: "Child 3", value: 20 },
      ],
    },
  },
  {
    id: "timeline1",
    name: "Conversion rate",
    type: "Timeline",
    data: {
      title: "Timeline",
      events: [
        { date: "2023-01-01", label: "New Year" },
        { date: "2023-02-14", label: "Valentine's Day" },
        { date: "2023-07-04", label: "Independence Day" },
      ],
    },
  },

  {
    id: "area1",
    name: "Conversion rate",
    type: "AreaChart",
    data: {
      xAxis: ["Jan", "Feb", "Mar", "Apr", "May"],
      series: [
        { name: "Temperature", data: [30, 25, 28, 32, 35] },
        { name: "Humidity", data: [70, 65, 68, 72, 75] },
      ],
    },
  },
  {
    id: "area2",
    name: "Conversion rate",
    type: "AreaChart",
    data: {
      xAxis: ["Jun", "Jul", "Aug", "Sep", "Oct"],
      series: [
        { name: "Rainfall", data: [100, 120, 150, 130, 110] },
        { name: "Sunshine", data: [200, 220, 250, 230, 210] },
      ],
    },
  },
];
