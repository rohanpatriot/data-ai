import React from "react";
import { Typography } from "@mui/material";
import WidgetBase from "../WidgetBase";

interface SmallTextWidgetProps {
  data: {
    title: string;
    content: string;
  };
  id: string;
}

const SmallTextWidget: React.FC<SmallTextWidgetProps> = ({ data, id }) => {
  return (
    <WidgetBase widgetId={id} title={data.title}>
      <Typography>{data.content}</Typography>
    </WidgetBase>
  );
};

export default SmallTextWidget;
