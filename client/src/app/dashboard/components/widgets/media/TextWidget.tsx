import React from "react";
import { Typography } from "@mui/material";
import WidgetBase from "../WidgetBase";

interface TextWidgetProps {
  data: {
    title: string;
    content: string;
  };
  id: string;
  refresh?: () => void;
}

const TextWidget: React.FC<TextWidgetProps> = ({ data, id, refresh }) => {
  return (
    <WidgetBase widgetId={id} title={data.title} refresh={refresh}>
      <Typography>{data.content}</Typography>
    </WidgetBase>
  );
};

export default TextWidget;
