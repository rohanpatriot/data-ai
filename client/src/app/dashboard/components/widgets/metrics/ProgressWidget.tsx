import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import WidgetBase from '../WidgetBase';

interface ProgressWidgetProps {
  data: {
    title: string;
    value: number;
    label?: string;
  };
}

const ProgressWidget: React.FC<ProgressWidgetProps> = ({ data }) => {
  return (
    <WidgetBase title={data.title}>
      <Box display="flex" flexDirection="column" gap={2}>
        {data.label && (
          <Typography variant="subtitle1">
            {data.label}
          </Typography>
        )}
        <LinearProgress 
          variant="determinate" 
          value={Math.min(100, Math.max(0, data.value))} 
        />
        <Typography variant="body2" color="text.secondary" align="right">
          {data.value}%
        </Typography>
      </Box>
    </WidgetBase>
  );
};

export default ProgressWidget;