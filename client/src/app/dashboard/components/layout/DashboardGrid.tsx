import { useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Responsive, WidthProvider, Layouts, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface DashboardGridProps {
  items?: number;
  rowHeight?: number;
  onLayoutChange?: (layout: Layout[], allLayouts: Layouts) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
  items = 20,
  rowHeight = 30,
  onLayoutChange = () => {},
}) => {
    const theme = useTheme();
    const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
    const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

    const generateLayouts = (): Layouts => {
    const widths = { lg: 2, md: 2, sm: 2, xs: 2, xxs: 1 };
    const layouts: Layouts = {};

    Object.keys(cols).forEach((breakpoint) => {
      const colCount = cols[breakpoint as keyof typeof cols];
      const width = widths[breakpoint as keyof typeof widths];
      layouts[breakpoint] = Array.from({ length: items }).map((_, i) => ({
        x: (i * width) % colCount,
        y: Math.floor(i / (colCount / width)) * 2,
        w: width,
        h: 2,
        i: i.toString(),
        minW: 2,
        maxW: 2,
        minH: 2,
        maxH: 4,
      }));
    });

    return layouts;
  };

  const [layouts, setLayouts] = useState<Layouts>(generateLayouts());

  const generateWidgets = () =>
    Array.from({ length: items }).map((_, i) => (
      <div
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
      </div>
    ));

  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    setLayouts(allLayouts);
    onLayoutChange(currentLayout, allLayouts);
  };

  return (
    <ResponsiveReactGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={breakpoints}
      cols={cols}
      rowHeight={rowHeight}
      onLayoutChange={handleLayoutChange}
      isDraggable
      isResizable
    //   compactType="vertical" // or "horizontal", or null to disable
      preventCollision={false}
    >
      {generateWidgets()}
    </ResponsiveReactGridLayout>
  );
};

export default DashboardGrid;