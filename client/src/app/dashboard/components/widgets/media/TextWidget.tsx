import React from 'react';
import { Typography } from '@mui/material';
import WidgetBase from '../WidgetBase';

interface TextWidgetProps {
  data: {
    content: string;
  };
}

const TextWidget: React.FC<TextWidgetProps> = ({ data }) => {
  return (
    <WidgetBase>
      <Typography>{data.content}</Typography>
    </WidgetBase>
  );
};

export default TextWidget;
