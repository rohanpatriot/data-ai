import React from 'react';
import { Box } from '@mui/material';
import WidgetBase from '../WidgetBase';

interface ImageWidgetProps {
  data: {
    title: string;
    src: string;
    alt?: string;
  };
  id: string;
}

const ImageWidget: React.FC<ImageWidgetProps> = ({ data, id }) => {
  return (
    <WidgetBase widgetId={id} title={data.title}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <img src={data.src} alt={data.alt || ''} style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Box>
    </WidgetBase>
  );
};

export default ImageWidget;
