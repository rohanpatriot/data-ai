import React from "react";
import { Typography } from "@mui/material";
import WidgetBase from "../WidgetBase";

interface SmallTextWidgetProps {
  data: {
    title: string;
    content: string;
  };
  id: string;
  refresh?: () => void;
}

const SmallTextWidget: React.FC<SmallTextWidgetProps> = ({ data, id, refresh }) => {
  return (
    <WidgetBase widgetId={id} title={data.title} refresh={refresh}>
      <Typography>{data.content}</Typography>
    </WidgetBase>
  );
};

export default SmallTextWidget;
