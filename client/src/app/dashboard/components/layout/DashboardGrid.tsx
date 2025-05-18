import { Box } from "@mui/material";
import React, { useState } from "react";
import { Responsive, WidthProvider, Layouts, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  getWidgetSizeConstraints,
  WidgetConfig,
} from "../widgets/util/WidgetUtil";
import { WidgetFactory } from "../widgets/WidgetFactory";
import { removeHorizontalGaps } from "../../util/DashboardUtil";
import { sampleWidgets } from "../../dev/mockData"; // Delete this line when implementing backend fetch of data

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface DashboardGridProps {
  rowHeight?: number;
  onLayoutChange?: (layout: Layout[], allLayouts: Layouts) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
  rowHeight = 30,
  onLayoutChange = () => {},
}) => {
  // When resizing the widget then resizing the window, widget only resizes in the breakpoint it is in, this is calling for bugs
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  const [widgets] = useState<WidgetConfig[]>(sampleWidgets);

  const generateLayouts = (): Layouts => {
    const breakpointsList = Object.keys(cols) as Array<keyof typeof cols>;
    const layouts: Layouts = {};

    for (const breakpoint of breakpointsList) {
      const colCount = cols[breakpoint];
      console.debug(
        `Generating layouts for ${breakpoint} with ${colCount} columns`
      );
      layouts[breakpoint] = widgets.map((widget, i) => {
        console.debug(`Generating layout for widget ${widget.id}, i = ${i}`);

        const sizeConstraints = getWidgetSizeConstraints(widget.type);
        console.debug("Size constraints: ", sizeConstraints);

        const defaultLayout: Layout = {
          i: widget.id,
          x: widget.layout?.x || 0,
          y: widget.layout?.y || 0,
          w: widget.layout?.w || 2,
          h: widget.layout?.h || 6,
          minW: sizeConstraints?.minW || 2,
          maxW: sizeConstraints?.maxW || 6,
          minH: sizeConstraints?.minH || 4,
          maxH: sizeConstraints?.maxH || 8,
        };
        return defaultLayout;
      });
    }

    return layouts;
  };

  const [layouts, setLayouts] = useState<Layouts>(generateLayouts());

  const generateWidgets = () =>
    widgets.map((widget) => (

      <Box
        key={widget.id}
        sx={{
          background: "transparent",
          borderRadius: 2,
        }}
      >
        {WidgetFactory(widget.type, widget.data)}
      </Box>
    ));

  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    const compactedLayouts: Layouts = {};

    Object.keys(allLayouts).forEach((breakpoint) => {
      compactedLayouts[breakpoint] = removeHorizontalGaps(
        allLayouts[breakpoint]
      );
    });

    setLayouts(compactedLayouts);
    onLayoutChange(currentLayout, compactedLayouts);
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
      isResizable={false}
      compactType="vertical"
    >
      {generateWidgets()}
    </ResponsiveReactGridLayout>
  );
};

export default DashboardGrid;
