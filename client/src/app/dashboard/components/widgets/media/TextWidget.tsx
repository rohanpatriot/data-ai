import React from "react";
import { Typography } from "@mui/material";
import WidgetBase from "../WidgetBase";

interface TextWidgetProps {
  data: {
    title: string;
    content: string;
  };
  id: string;
}

const TextWidget: React.FC<TextWidgetProps> = ({ data, id }) => {
  return (
    <WidgetBase widgetId={id} title={data.title}>
      <Typography>{data.content}</Typography>
    </WidgetBase>
  );
};

export default TextWidget;
