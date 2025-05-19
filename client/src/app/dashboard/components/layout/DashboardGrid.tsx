import { Box, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider, Layouts, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { getWidgetSizeConstraints } from "../widgets/util/WidgetUtil";
import { WidgetFactory } from "../widgets/WidgetFactory";
import { removeHorizontalGaps } from "../../util/DashboardUtil";
import { useSearchParams } from "react-router-dom";
import { useWidgets } from "../../hooks/useWidgets";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface DashboardGridProps {
  rowHeight?: number;
  onLayoutChange?: (layout: Layout[], allLayouts: Layouts) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
  rowHeight = 40,
  onLayoutChange = () => {},
}) => {
  // When resizing the widget then resizing the window, widget only resizes in the breakpoint it is in, this is calling for bugs
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");

  const { widgets, loading, error } = useWidgets(projectId || undefined);
  const [layouts, setLayouts] = useState<Layouts>({});

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
          x: widget.x || 0,
          y: widget.y || 0,
          w: widget.w || sizeConstraints?.minW || 2,
          h: widget.h || sizeConstraints?.minH || 4,
          //currently widgets are not resizable, once support is added, remove the comments below
          // Also adjust w / h in the defaultLayout object above, Add isResizable: true to object
          //--------------------------------------------------------------------------------------
          // minW: sizeConstraints?.minW || 2,
          // maxW: sizeConstraints?.maxW || 6,
          // minH: sizeConstraints?.minH || 4,
          // maxH: sizeConstraints?.maxH || 8,
        };
        return defaultLayout;
      });
    }

    return layouts;
  };

  useEffect(() => {
    if (widgets.length > 0) {
      setLayouts(generateLayouts());
    }
  }, [widgets]);

  const generateWidgets = () =>
    widgets.map((widget) => (
      <Box
        key={widget.id}
        sx={{
          background: "transparent",
          borderRadius: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Widget content without duplicating the title */}
        <Box sx={{ flexGrow: 1, p: 1 }}>
          {WidgetFactory(widget.type, widget.data)}
        </Box>
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

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        Error loading widgets: {error.message}
      </Box>
    );
  }

  if (widgets.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        No widgets found. Add some widgets to get started.
      </Box>
    );
  }

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
      compactType={null} // Change from "vertical" to null to prevent automatic compacting
      preventCollision={true} // Prevent widgets from overlapping
      draggableCancel=".no-drag"
    >
      {generateWidgets()}
    </ResponsiveReactGridLayout>
  );
};

export default DashboardGrid;
