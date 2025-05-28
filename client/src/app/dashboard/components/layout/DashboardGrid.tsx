import { Box, CircularProgress, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider, Layouts, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { getWidgetSizeConstraints } from "../widgets/util/WidgetUtil";
import { WidgetFactory } from "../widgets/WidgetFactory";
import { removeHorizontalGaps } from "../../util/DashboardUtil";
import { useSearchParams } from "react-router-dom";
import { useWidgets } from "../../hooks/useWidgets";
import { useMessages } from "../../hooks/useMessages";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface DashboardGridProps {
  readonly?: boolean;
  projectId?: string;
  dashboardLoading?: boolean;
  rowHeight?: number;
  onLayoutChange?: (layout: Layout[], allLayouts: Layouts) => void;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
  readonly = false,
  dashboardLoading = false,
  projectId: propProjectId,
  rowHeight = 40,
  onLayoutChange = () => {},
}) => {
  // When resizing the widget then resizing the window, widget only resizes in the breakpoint it is in, this is calling for bugs
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  const [searchParams] = useSearchParams();
  const projectId = propProjectId || searchParams.get("projectId");

  const { widgets, loading, error, refresh } = useWidgets(
    projectId || undefined
  );
  const { setReferencedWidget } = useMessages(projectId || undefined);
  const [layouts, setLayouts] = useState<Layouts>({});

  const onReference = (widgetId: string) => {
    setReferencedWidget({ id: widgetId });
  };

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
          i: `${widget.id}`,
          x: widget.x || 0,
          y: widget.y || 0,
          w: sizeConstraints?.minW || 2,
          h: sizeConstraints?.minH || 4,
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

  useEffect(() => {
    if (!dashboardLoading) {
      refresh();
    }
  }, [dashboardLoading]);

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
          width: "100%",
        }}
      >
        {/* Widget content without duplicating the title */}
        <Box sx={{ flexGrow: 1, width: "inherit", height: "inherit" }}>
          {WidgetFactory(widget.type, widget.data, widget.id, refresh, () => {
            onReference(widget.id);
          })}
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
      <ResponsiveReactGridLayout
        className="layout"
        layouts={{
          lg: Array.from({ length: 6 }).map((_, i) => ({
            i: `skeleton-${i}`,
            x: (i % 3) * 4,
            y: Math.floor(i / 3) * 4,
            w: 4,
            h: 4,
          })),
          md: Array.from({ length: 6 }).map((_, i) => ({
            i: `skeleton-${i}`,
            x: (i % 2) * 5,
            y: Math.floor(i / 2) * 4,
            w: 5,
            h: 4,
          })),
          sm: Array.from({ length: 6 }).map((_, i) => ({
            i: `skeleton-${i}`,
            x: 0,
            y: i * 4,
            w: 6,
            h: 4,
          })),
          xs: Array.from({ length: 6 }).map((_, i) => ({
            i: `skeleton-${i}`,
            x: 0,
            y: i * 4,
            w: 4,
            h: 4,
          })),
          xxs: Array.from({ length: 6 }).map((_, i) => ({
            i: `skeleton-${i}`,
            x: 0,
            y: i * 4,
            w: 2,
            h: 4,
          })),
        }}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={rowHeight}
        isDraggable={false}
        isResizable={false}
        compactType="vertical"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <Box
            key={`skeleton-${index}`}
            sx={{
              background: "transparent",
              borderRadius: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              p: 2,
            }}
          >
            {/* Widget header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Skeleton
                variant="text"
                width={`${40 + (index % 3) * 10}%`}
                height={24}
              />
              <Skeleton variant="circular" width={24} height={24} />
            </Box>

            {/* Dynamic content based on index */}
            {index % 4 === 0 && (
              // Chart-like skeleton
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ borderRadius: 1 }}
                />
              </Box>
            )}

            {index % 4 === 1 && (
              // Table-like skeleton
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <Skeleton variant="text" width="25%" height={20} />
                  <Skeleton variant="text" width="25%" height={20} />
                  <Skeleton variant="text" width="25%" height={20} />
                  <Skeleton variant="text" width="25%" height={20} />
                </Box>
                {Array.from({ length: 3 }).map((_, rowIndex) => (
                  <Box key={rowIndex} sx={{ display: "flex", gap: 1, mb: 0.5 }}>
                    <Skeleton variant="text" width="25%" height={16} />
                    <Skeleton variant="text" width="25%" height={16} />
                    <Skeleton variant="text" width="25%" height={16} />
                    <Skeleton variant="text" width="25%" height={16} />
                  </Box>
                ))}
              </Box>
            )}

            {index % 4 === 2 && (
              // Stats-like skeleton
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexGrow: 1,
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Skeleton
                    variant="circular"
                    width={48}
                    height={48}
                    sx={{ mx: "auto", mb: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width={80}
                    height={32}
                    sx={{ mx: "auto" }}
                  />
                </Box>
              </Box>
            )}

            {index % 4 === 3 && (
              // Text-like skeleton
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton
                  variant="text"
                  width="100%"
                  height={16}
                  sx={{ mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="90%"
                  height={16}
                  sx={{ mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="95%"
                  height={16}
                  sx={{ mb: 1 }}
                />
                <Skeleton variant="text" width="80%" height={16} />
              </Box>
            )}
          </Box>
        ))}
      </ResponsiveReactGridLayout>
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

  const hasAllBreakpoints = Object.keys(cols).every(
    (breakpoint) =>
      breakpoint in layouts &&
      layouts[breakpoint] &&
      layouts[breakpoint].length > 0
  );

  if (!hasAllBreakpoints) {
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

  return (
    <ResponsiveReactGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={breakpoints}
      cols={cols}
      rowHeight={rowHeight}
      onLayoutChange={handleLayoutChange}
      isDraggable={!readonly}
      isResizable={false}
      compactType="vertical"
      draggableCancel=".no-drag"
    >
      {generateWidgets()}
    </ResponsiveReactGridLayout>
  );
};

export default DashboardGrid;
