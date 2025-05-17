import React from 'react';
import { Box, Typography } from '@mui/material';
import WidgetBase from '../WidgetBase';

interface StatsCardWidgetProps {
  data: {
    title: string;
    value: number;
    icon?: string;
  };
}

const StatsCardWidget: React.FC<StatsCardWidgetProps> = ({ data }) => {
  return (
    <WidgetBase>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
        {data.icon && (
          <Box mb={2}>
            <img src={data.icon} alt={data.title} style={{ width: 96, height: 48 }} />
          </Box>
        )}
        <Typography variant="h4" component="div" gutterBottom>
          {data.value}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {data.title}
        </Typography>
      </Box>
    </WidgetBase>
  );
};

export default StatsCardWidget;
