
export const generateMockBarChartData = (seedPhrase: string) => {
  // Use the seedPhrase to deterministically generate data
  const hash = seedPhrase.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const categories = ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'];
  
  return categories.map((category, index) => {
    return {
      name: category,
      value: 10 + Math.floor(((hash + index * 13) % 90))
    };
  });
};

export const generateMockPieChartData = (seedPhrase: string) => {
  // Use the seedPhrase to deterministically generate data
  const hash = seedPhrase.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  
  return items.map((item, index) => {
    return {
      name: item,
      value: 15 + Math.floor(((hash + index * 17) % 85))
    };
  });
};

export const generateMockLineChartData = (seedPhrase: string) => {
  // Use the seedPhrase to deterministically generate data
  const hash = seedPhrase.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  return months.map((month, index) => {
    return {
      name: month,
      value: 20 + Math.floor(((hash + index * 19) % 80))
    };
  });
};

export const generateMockBubbleChartData = (seedPhrase: string) => {
  // Use the seedPhrase to deterministically generate data
  const hash = seedPhrase.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const items = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  return items.map((item, index) => {
    return {
      name: item,
      value: 10 + Math.floor(((hash + index * 23) % 90)),
      size: 10 + Math.floor(((hash + index * 29) % 40))
    };
  });
};

export const generateMockScatterChartData = (seedPhrase: string) => {
  // Use the seedPhrase to deterministically generate data
  const hash = seedPhrase.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const items = Array.from({ length: 10 }, (_, i) => `Point ${i + 1}`);
  
  return items.map((item, index) => {
    return {
      name: item,
      x: 10 + Math.floor(((hash + index * 31) % 90)),
      y: 10 + Math.floor(((hash + index * 37) % 90))
    };
  });
};
