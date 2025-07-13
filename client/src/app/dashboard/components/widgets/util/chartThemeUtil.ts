import { createContext, useContext } from 'react';
import { useAppTheme } from '../../../../../theme/ThemeContext';
// import { EChartOption } from 'echarts-for-react';

export type WidgetThemePreset = 'business' | 'modern' | 'legacy';
export interface WidgetThemeColors {
  primary: string[];
  accent: string;
  background: string;
  text: string;
  grid: string;
  axisLine: string;
}

export const themePresets: Record<WidgetThemePreset, WidgetThemeColors> = {
  legacy: {
    primary: ['#A224F0', '#6C757D', '#495057', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074'],
    accent: '#A224F0',
    background: 'transparent',
    text: '#212529',
    grid: '#E9ECEF',
    axisLine: '#6C757D'
    },
  business: {
    primary: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    accent: '#5470c6',
    background: 'transparent',
    text: '#333333',
    grid: '#f5f5f5',
    axisLine: '#cccccc'
  },
  modern: {
    primary: ['#80FFA5', '#00DDFF', '#A149FA', '#37A2FF', '#FF0087', '#FFBF00', '#0CC0DF', '#FF7C43', '#46AF78'],
    accent: '#00DDFF',
    background: 'transparent',
    text: '#333333',
    grid: '#f5f5f5',
    axisLine: '#cccccc'
  },
};


export interface WidgetThemeContextType {
    themePreset: WidgetThemePreset;
    colors: WidgetThemeColors;
    setThemePreset: (preset: WidgetThemePreset) => void;
  }

export const WidgetThemeContext = createContext<WidgetThemeContextType>({
    themePreset: 'business',
    colors: themePresets.business,
    setThemePreset: () => {}
  });
// Hook for using the widget theme
export const useWidgetTheme = () => {
  const context = useContext(WidgetThemeContext);
  const { mode } = useAppTheme();
  // Dynamically override text color based on app theme
  const dynamicColors = {
    ...context.colors,
    text: mode === 'dark' ? '#fff' : '#212529',
  };
  return { ...context, colors: dynamicColors };
};

export const applyThemeToChartOptions = (
  options: any, 
  colors: WidgetThemeColors
): any => {
  const themedOptions = JSON.parse(JSON.stringify(options));
  
  // Apply color palette
  themedOptions.color = colors.primary;
  
  // Style x-axis
  if (themedOptions.xAxis) {
    if (Array.isArray(themedOptions.xAxis)) {
      themedOptions.xAxis.forEach((axis: any) => {
        axis.axisLine = axis.axisLine || {};
        axis.axisLine.lineStyle = axis.axisLine.lineStyle || {};
        axis.axisLine.lineStyle.color = colors.axisLine;
        
        axis.axisLabel = axis.axisLabel || {};
        axis.axisLabel.color = colors.text;
        
        axis.splitLine = axis.splitLine || {};
        axis.splitLine.lineStyle = axis.splitLine.lineStyle || {};
        axis.splitLine.lineStyle.color = colors.grid;
      });
    } else {
      themedOptions.xAxis.axisLine = themedOptions.xAxis.axisLine || {};
      themedOptions.xAxis.axisLine.lineStyle = themedOptions.xAxis.axisLine.lineStyle || {};
      themedOptions.xAxis.axisLine.lineStyle.color = colors.axisLine;
      
      themedOptions.xAxis.axisLabel = themedOptions.xAxis.axisLabel || {};
      themedOptions.xAxis.axisLabel.color = colors.text;
      
      themedOptions.xAxis.splitLine = themedOptions.xAxis.splitLine || {};
      themedOptions.xAxis.splitLine.lineStyle = themedOptions.xAxis.splitLine.lineStyle || {};
      themedOptions.xAxis.splitLine.lineStyle.color = colors.grid;
    }
  }
  
  // Style y-axis (add this section)
  if (themedOptions.yAxis) {
    if (Array.isArray(themedOptions.yAxis)) {
      themedOptions.yAxis.forEach((axis: any) => {
        axis.axisLine = axis.axisLine || {};
        axis.axisLine.lineStyle = axis.axisLine.lineStyle || {};
        axis.axisLine.lineStyle.color = colors.axisLine;
        
        axis.axisLabel = axis.axisLabel || {};
        axis.axisLabel.color = colors.text;
        
        axis.splitLine = axis.splitLine || {};
        axis.splitLine.lineStyle = axis.splitLine.lineStyle || {};
        axis.splitLine.lineStyle.color = colors.grid;
      });
    } else {
      themedOptions.yAxis.axisLine = themedOptions.yAxis.axisLine || {};
      themedOptions.yAxis.axisLine.lineStyle = themedOptions.yAxis.axisLine.lineStyle || {};
      themedOptions.yAxis.axisLine.lineStyle.color = colors.axisLine;
      
      themedOptions.yAxis.axisLabel = themedOptions.yAxis.axisLabel || {};
      themedOptions.yAxis.axisLabel.color = colors.text;
      
      themedOptions.yAxis.splitLine = themedOptions.yAxis.splitLine || {};
      themedOptions.yAxis.splitLine.lineStyle = themedOptions.yAxis.splitLine.lineStyle || {};
      themedOptions.yAxis.splitLine.lineStyle.color = colors.grid;
    }
  }
  
  // Style grid
  if (themedOptions.grid) {
    themedOptions.grid.borderColor = colors.grid;
  } else {
    themedOptions.grid = { borderColor: colors.grid };
  }
  
  // Style legend
  if (themedOptions.legend) {
    themedOptions.legend.textStyle = themedOptions.legend.textStyle || {};
    themedOptions.legend.textStyle.color = colors.text;
  }
  
  // Style tooltip
  if (themedOptions.tooltip) {
    themedOptions.tooltip.textStyle = themedOptions.tooltip.textStyle || {};
    themedOptions.tooltip.textStyle.color = colors.text;
    themedOptions.tooltip.backgroundColor = colors.background;
    themedOptions.tooltip.borderColor = colors.grid;
  }
  
  // Add background color to the chart
  themedOptions.backgroundColor = colors.background;
  
  return themedOptions;
};
