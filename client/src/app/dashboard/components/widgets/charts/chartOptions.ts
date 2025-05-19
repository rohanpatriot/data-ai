export const getAreaChartOptions = (
  xAxis: string[],
  series: { name: string; data: number[] }[]
) => ({
  xAxis: { type: "category", data: xAxis },
  yAxis: { type: "value" },
  series: series.map((s) => ({
    name: s.name,
    type: "line",
    areaStyle: {},
    data: s.data,
  })),
});

export const getBarChartOptions = (
  categories: string[],
  series: { name: string; data: number[] }[]
) => ({
  tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
  legend: { data: series.map((s) => s.name) },
  xAxis: { type: "category", data: categories },
  yAxis: { type: "value" },
  series: series.map((s) => ({ name: s.name, type: "bar", data: s.data })),
});

export const getLineChartOptions = (
  xAxis: string[],
  series: { name: string; data: number[] }[]
) => ({
  tooltip: { trigger: "axis" },
  legend: { data: series.map((s) => s.name), bottom: 0 },
  xAxis: { type: "category", data: xAxis },
  yAxis: { type: "value" },
  series: series.map((s) => ({
    name: s.name,
    type: "line",
    data: s.data,
    smooth: true,
  })),
});

export const getPieChartOptions = (labels: string[], values: number[]) => ({
  tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
  series: [
    {
      type: "pie",
      radius: "65%",
      data: labels.map((label, index) => ({
        name: label,
        value: values[index],
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

export const getPlotChartOptions = (x: number[], y: number[]) => ({
  xAxis: { type: "value" },
  yAxis: { type: "value" },
  series: [
    {
      type: "scatter",
      data: x.map((xi, i) => [xi, y[i]]),
    },
  ],
});
