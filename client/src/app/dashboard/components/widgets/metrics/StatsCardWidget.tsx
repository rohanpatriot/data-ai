import React from "react";
import { Box, Typography } from "@mui/material";
import WidgetBase from "../WidgetBase";

interface StatsCardWidgetProps {
  data: {
    title: string;
    value: number;
    icon?: string;
  };
  id: string;
  refresh?: () => void;
}

const StatsCardWidget: React.FC<StatsCardWidgetProps> = ({ data, id, refresh }) => {
  return (
    <WidgetBase widgetId={id} title={data.title} refresh={refresh}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        {data.icon && (
          <Box mb={1}>
            <img
              src={data.icon}
              alt={data.title}
              style={{ width: 96, height: 48 }}
            />
          </Box>
        )}
        <Typography variant="h4" component="div" gutterBottom>
          {data.value}
        </Typography>
      </Box>
    </WidgetBase>
  );
};

export default StatsCardWidget;
