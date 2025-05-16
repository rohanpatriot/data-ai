import React, { useState, useEffect } from 'react';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import { useTheme } from '@mui/material/styles';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Box } from '@mui/material';

const ReactGridLayout = WidthProvider(RGL);

interface DashboardGridProps {
  items?: number;
  cols?: number;
  rowHeight?: number;
  onLayoutChange?: (layout: Layout[]) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
  items = 20,
  cols = 12,
  rowHeight = 30,
  onLayoutChange = () => {},
}) => {
  const [layout, setLayout] = useState<Layout[]>([]);
  const range = (count: number) => Array.from({ length: count }, (_, i) => i);
  const theme = useTheme();

  // Just a dummy config and logic for generating widgets
  useEffect(() => {
    const newLayout: Layout[] = range(items).map((i) => {
      const y = Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % cols,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
        minW: 2,
        maxW: 4,
        minH: 2,
        maxH: 6,
      };
    });

    setLayout(newLayout);
  }, [items, cols]);

  const generateWidgets = (): React.ReactElement[] => {
    const range = (count: number) => Array.from({ length: count }, (_, i) => i);
    return range(items).map((i) => (
      <Box
        key={i.toString()}
        style={{
          background: `${theme.palette.secondary.light}`,
          color: `${theme.palette.secondary.dark}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 4,
        }}
      >
        <span style={{ fontWeight: 'bold' }}>Widget {i}</span>
      </Box>
    ));
  };

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    onLayoutChange(newLayout);
  };

  return (
    <ReactGridLayout
      layout={layout}
      cols={cols}
      rowHeight={rowHeight}
      width={1200}
      onLayoutChange={handleLayoutChange}
      isResizable={true}
      isDraggable={true}
    >
      {generateWidgets()}
    </ReactGridLayout>
  );
};

export default DashboardGrid;