import React from "react";
import { Box, Typography } from "@mui/material";
import WidgetBase from "../WidgetBase";

interface KPIWidgetProps {
  data: {
    title: string;
    value: number;
    trend?: number;
  };
}

const KPIWidget: React.FC<KPIWidgetProps> = ({ data }) => {
  return (
    <WidgetBase title={data.title}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Typography variant="h6" gutterBottom>
          {data.title}
        </Typography>
        <Typography variant="h4" gutterBottom>
          {data.value}
        </Typography>
        {/* I'll comment it cause to start I'm not sure we'll have this data */}
        {/* {data.trend !== undefined && (
          <Chip
            icon={data.trend >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
            label={`${Math.abs(data.trend)}%`}
            color={data.trend >= 0 ? 'success' : 'error'}
          />
        )} */}
      </Box>
    </WidgetBase>
  );
};

export default KPIWidget;
