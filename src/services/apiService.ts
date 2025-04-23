
import {
  generateMockBarChartData,
  generateMockPieChartData,
  generateMockLineChartData,
  generateMockBubbleChartData,
  generateMockScatterChartData
} from '../utils/mockData';

type ChartType = 'bar' | 'pie' | 'line' | 'bubble' | 'scatter';

// Mock API response generation
export const fetchMockResponse = async (message: string): Promise<{
  text: string;
  chartType: ChartType;
  chartData: any;
}> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Determine chart type based on input message (for demo purposes)
  let chartType: ChartType = 'bar';
  
  if (message.toLowerCase().includes('pie')) {
    chartType = 'pie';
  } else if (message.toLowerCase().includes('line')) {
    chartType = 'line';
  } else if (message.toLowerCase().includes('bubble')) {
    chartType = 'bubble';
  } else if (message.toLowerCase().includes('scatter')) {
    chartType = 'scatter';
  } else {
    // Randomly pick a chart type if not specified in the message
    const types: ChartType[] = ['bar', 'pie', 'line', 'bubble', 'scatter'];
    chartType = types[Math.floor(Math.random() * types.length)];
  }
  
  // Generate mock data based on chart type
  let chartData;
  switch (chartType) {
    case 'bar':
      chartData = generateMockBarChartData(message);
      break;
    case 'pie':
      chartData = generateMockPieChartData(message);
      break;
    case 'line':
      chartData = generateMockLineChartData(message);
      break;
    case 'bubble':
      chartData = generateMockBubbleChartData(message);
      break;
    case 'scatter':
      chartData = generateMockScatterChartData(message);
      break;
    default:
      chartData = generateMockBarChartData(message);
  }
  
  // Generate a mock response text
  const responses = [
    `Here's a ${chartType} chart visualization of your query.`,
    `I've analyzed your request and created a ${chartType} chart to help visualize the data.`,
    `Based on your message, I think a ${chartType} chart would be most helpful.`,
    `I've processed your query and generated this ${chartType} chart visualization.`
  ];
  
  const text = responses[Math.floor(Math.random() * responses.length)];
  
  return {
    text,
    chartType,
    chartData
  };
};

// Placeholder for future integration with actual API
export const fetchRealApiResponse = async (message: string): Promise<any> => {
  // This will be implemented later with the Perplexity Sonar API
  return fetchMockResponse(message);
};
